import { NextRequest, NextResponse } from "next/server";
import { Card } from "@prisma/client";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  const items = (await request.json()) as Card[];

  let cards;
  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              userId: user.id,
            },
          },
        },
        data: {
          order: card.order,
          list: {
            connect: {
              id: card.listId,
            },
          },
        },
      })
    );

    cards = await db.$transaction(transaction);
    return NextResponse.json(cards);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка выполнения!" },
      { status: 400 }
    );
  }
}
