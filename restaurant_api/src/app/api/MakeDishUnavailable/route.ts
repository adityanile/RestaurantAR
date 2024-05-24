import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// API Body :
// {
//   "dish_id" : [1,2]     ; Enter the dish ids of the dish to take down and leave the rest active
// }

export async function POST(req: Request) {
  const { dish_id } = await req.json();

  // Authentication to use the api
  if (req.headers.get("key") !== process.env.key || !req.headers.has("key")) {
    return NextResponse.json({ status: "fail", msg: "Unauthorised Request" });
  }

  // Now before marking this dishes inactive active all the other 10 dishes
  try {
    await prisma.dishes.updateMany({
      data: {
        isAvaiable: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ status: "fail", e });
    }
  }
  let count = 0;

  for (let i = 0; i < dish_id.length; i++) {
    try {
      await prisma.dishes.update({
        where: {
          id: dish_id[i],
        },
        data: {
          isAvaiable: false,
        },
      });
      count++;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({ status: "fail", e });
      }
    }
  }

  return NextResponse.json({ status: "success", updated: count });
}
