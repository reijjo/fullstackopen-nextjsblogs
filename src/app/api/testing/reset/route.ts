import { db } from "@/db";
import { readingList, blogs, users } from "@/db/schema";
import { NextResponse } from "next/server";

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error: "This endpoint is not available in production",
      },
      { status: 403 },
    );
  }

  try {
    await db.delete(readingList);
    await db.delete(blogs);
    await db.delete(users);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to reset DB:", error);
    return NextResponse.json(
      { error: "Failed to reset database" },
      { status: 500 },
    );
  }
};
