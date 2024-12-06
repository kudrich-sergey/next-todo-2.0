import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  const id = params.id;
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            userId: user.id,
          },
        },
      },
    });

    let cards = await db.card.findMany({
      where: { listId: card.listId },
      orderBy: { order: "asc" },
    });

    const transaction = cards.map((card, index) =>
      db.card.update({
        where: {
          id: card.id,
        },
        data: {
          order: index + 1,
        },
      })
    );

    cards = await db.$transaction(transaction);
    return NextResponse.json(card);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка удаления задачи!" },
      { status: 400 }
    );
  }
}
