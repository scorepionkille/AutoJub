import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// ──── GET /api/tasks/:id ────
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as { id?: string }).id;

    const task = await prisma.tasks.findFirst({
      where: { id, userId },
      include: { category: true },
    });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("[GET /api/tasks/:id]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ──── PATCH /api/tasks/:id ────
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as { id?: string }).id;

    // Verify ownership
    const existing = await prisma.tasks.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const body = await request.json();
    const { title, description, status, categoryId, dueDate } = body;

    // Build update data — only include provided fields
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) {
      const validStatuses = ["PENDING", "IN_PROGRESS", "COMPLETED"] as const;
      if (validStatuses.includes(status)) {
        updateData.status = status;
      }
    }
    if (categoryId !== undefined) updateData.categoryId = categoryId || null;
    if (dueDate !== undefined)
      updateData.dueDate = dueDate ? new Date(dueDate) : null;

    const task = await prisma.tasks.update({
      where: { id },
      data: updateData,
      include: { category: true },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error("[PATCH /api/tasks/:id]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// ──── DELETE /api/tasks/:id ────
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as { id?: string }).id;

    // Verify ownership
    const existing = await prisma.tasks.findFirst({
      where: { id, userId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    await prisma.tasks.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[DELETE /api/tasks/:id]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
