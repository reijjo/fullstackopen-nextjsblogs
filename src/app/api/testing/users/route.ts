import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      { status: 403 },
    );
  }

  try {
    const { username, name, password } = await request.json();

    if (!username || !name || !password) {
      return NextResponse.json({ error: "Invalid values" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await db.insert(users).values({ username, name, passwordHash });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("create user route rror", error);
    return NextResponse.json(
      { error: "Something shady happened" },
      { status: 400 },
    );
  }
};
