import { NextRequest, NextResponse } from "next/server";
import { Card } from "@prisma/client";

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

  const { listId, title } = (await request.json()) as Card;

  if (title.length <= 0) {
    return NextResponse.json(
      { message: "Название задачи не заполнено!" },
      { status: 400 }
    );
  }

  let card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          userId: user.id,
        },
      },
    });

    if (!list) {
      return NextResponse.json(
        { message: "Список задач не найден!" },
        { status: 400 }
      );
    }

    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        order: newOrder,
        list: {
          connect: {
            id: listId,
          },
        },
      },
    });
    return NextResponse.json(card);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка добавления задачи!" },
      { status: 400 }
    );
  }
}

