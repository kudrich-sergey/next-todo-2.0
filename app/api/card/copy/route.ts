import { NextRequest, NextResponse } from "next/server";

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

  const id = (await request.json()) as string;

  let card;
  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            userId: user.id,
          },
        },
      },
    });

    if (!cardToCopy) {
      return NextResponse.json(
        { message: "Задача не найдена!" },
        { status: 400 }
      );
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    const cards = await db.card.findMany({
      where: {
        listId: cardToCopy.listId,
      },
      orderBy: { order: "asc" },
      select: { title: true },
    });

    const similarCopyCard = cards.filter((card) =>
      card.title.includes(cardToCopy.title)
    );

    const newTitle = `${similarCopyCard[0].title} (${similarCopyCard.length})`;

    card = await db.card.create({
      data: {
        title: newTitle,
        order: newOrder,
        list: {
          connect: {
            id: cardToCopy.listId,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка копирования задачи!" },
      { status: 400 }
    );
  }
}
