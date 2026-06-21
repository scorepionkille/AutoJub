import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    // ──── Validation ────
    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // ──── Check duplicate ────
    const existing = await prisma.user_info.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // ──── Create user ────
    const passwordHash = await bcrypt.hash(password, 12);

    const validRoles = ["CUSTOMER", "ADMIN", "STAFF"] as const;
    const userRole = validRoles.includes(role) ? role : "CUSTOMER";

    const user = await prisma.user_info.create({
      data: {
        email,
        passwordHash,
        name: name || null,
        role: userRole,
      },
    });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Register Error]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
