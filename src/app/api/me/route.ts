import { getMe } from "@/app/services/me";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.slice("Bearer ".length);

  const me = await getMe(token);
  if (!me) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(me);
};
