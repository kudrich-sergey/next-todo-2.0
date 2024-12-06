import { NextRequest, NextResponse } from "next/server";
import { Board } from "@prisma/client";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  const boards = await db.board.findMany({
    where: {
      userId: user.id,
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(boards);
}

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  const { title, imageSmall, imageMedium } = (await request.json()) as Board;

  if (title.length <= 0) {
    return NextResponse.json(
      { message: "Заполните поле Название!" },
      { status: 400 }
    );
  }

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        imageSmall,
        imageMedium,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return NextResponse.json(board);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка добавления доски!" },
      { status: 400 }
    );
  }
}
