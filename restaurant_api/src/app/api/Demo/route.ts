import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await prisma.dishes.findMany({});

  return NextResponse.json({ res });
}
