import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// Make GET request to the api and get the list of unavailable dishes

export async function GET(req: Request) {
  try {
    const res = await prisma.dishes.findMany({
      where: {
        isAvaiable: false,
      },
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
      },
    });

    let arr: number[] = [];

    for (let i = 0; i < res.length; i++) {
      arr.push(res[i].id);
    }

    return NextResponse.json({ dish_id: arr });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ status: "fail", e });
    }
  }
}
