import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// API Body :
// {
//   "dish_id" : 1    ; Enter the dish ids of the dish to take down and leave the rest active
// }

export async function POST(req: Request) {
  const { dish_id } = await req.json();

  // Authentication to use the api
  if (req.headers.get("key") !== process.env.key || !req.headers.has("key")) {
    return NextResponse.json({ status: "fail", msg: "Unauthorised Request" });
  }

  if (!dish_id) {
    return NextResponse.json({ status: "fail", msg: "Missing Params" });
  }

  try {
    const odr = await prisma.dishes.update({
      where: {
        id: dish_id,
      },
      data: {
        orders: {
          increment: 1,
        },
      },
      select: {
        orders: true,
      },
    });

    return NextResponse.json({ status: "success", CurrentOrders: odr.orders });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ status: "fail", e });
    }
  }
}
