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

  const data = (await request.json()) as Card;

  let card;
  try {
    card = await db.card.update({
      where: {
        id: data.id,
        list: {
          board: {
            userId: user.id,
          },
        },
      },
      data: { ...data },
    });

    return NextResponse.json(card);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка выполнения!" },
      { status: 400 }
    );
  }
}
