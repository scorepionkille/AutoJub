import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ──── GET /api/tasks/calendar ────
// Returns aggregated task counts per day for the GitHub-style contribution calendar
// Query: ?year=2026 (optional, defaults to current year)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const year = parseInt(
      searchParams.get("year") || new Date().getFullYear().toString()
    );

    // Fetch data for 12 months back from today
    const today = new Date();
    const startDate = new Date(today);
    startDate.setMonth(startDate.getMonth() - 11);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setHours(23, 59, 59, 999);

    const tasks = await prisma.tasks.findMany({
      where: {
        userId,
        createdAt: { gte: startDate, lte: endDate },
      },
      select: {
        createdAt: true,
        status: true,
      },
    });

    // Group by date
    const dayMap = new Map<string, { total: number; completed: number }>();

    for (const task of tasks) {
      const dateStr = task.createdAt.toISOString().split("T")[0];
      const entry = dayMap.get(dateStr) || { total: 0, completed: 0 };
      entry.total++;
      if (task.status === "COMPLETED") entry.completed++;
      dayMap.set(dateStr, entry);
    }

    // Convert to DayData array with level calculation
    const calendarData = Array.from(dayMap.entries()).map(([date, data]) => {
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (data.total <= 2) level = 1;
      else if (data.total <= 4) level = 2;
      else if (data.total <= 6) level = 3;
      else level = 4;

      return {
        date,
        taskCount: data.total,
        completedCount: data.completed,
        level,
      };
    });

    // Suppress unused variable warning for 'year' since it's parsed for validation
    void year;

    return NextResponse.json(calendarData);
  } catch (error) {
    console.error("[GET /api/tasks/calendar]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
