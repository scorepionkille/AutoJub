import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ──── GET /api/tasks ────
// Query: ?date=YYYY-MM-DD (optional)
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
    const date = searchParams.get("date");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = { userId };

    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      where.createdAt = { gte: startOfDay, lte: endOfDay };
    }

    const tasks = await prisma.tasks.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("[GET /api/tasks]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ──── POST /api/tasks ────
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as { id?: string }).id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, categoryId, dueDate, status } = body;

    if (!title) {
      return NextResponse.json(
        { error: "title is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;
    const taskStatus = validStatuses.includes(status) ? status : "PENDING";

    const task = await prisma.tasks.create({
      data: {
        title,
        description: description || null,
        userId,
        categoryId: categoryId || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        status: taskStatus,
      },
      include: { category: true },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("[POST /api/tasks]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
