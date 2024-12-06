import { NextRequest, NextResponse } from "next/server";
import { List } from "@prisma/client";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  const { boardId, title, color, background } = (await request.json()) as List;

  if (title.length <= 0) {
    return NextResponse.json(
      { message: "Заполните поле Название!" },
      { status: 400 }
    );
  }

  let list;
  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        userId: user.id,
      },
    });

    if (!board) {
      return NextResponse.json(
        { message: "Доска не найдена!" },
        { status: 400 }
      );
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        color,
        background,
        order: newOrder,
        board: {
          connect: {
            id: boardId,
          },
        },
      },
    });
    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка добавления доски!" },
      { status: 400 }
    );
  }
}
