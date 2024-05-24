import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await prisma.dishes.findMany({ orderBy: { id: "asc" } });

  return NextResponse.json({ res });
}
