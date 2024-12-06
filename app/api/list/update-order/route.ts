import { NextRequest, NextResponse } from "next/server";
import { List } from "@prisma/client";

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

  const items = (await request.json()) as List[];

  let lists;
  try {
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: {
            userId: user.id,
          },
        },
        data: {
          order: list.order,
        },
      })
    );

    lists = await db.$transaction(transaction);
    return NextResponse.json(lists);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка выполнения!" },
      { status: 400 }
    );
  }
}
