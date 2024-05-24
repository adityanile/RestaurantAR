import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Fetch me the Top 3 Most ordered Items

export async function GET(req: Request) {
  const res = await prisma.dishes.findMany({
    orderBy: {
      orders: "desc",
    },
    take: 3,
    select: {
      id: true,
      orders: true,
    },
  });

  return NextResponse.json({ dishes: res });
}
