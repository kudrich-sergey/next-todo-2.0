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

  const { id, title } = (await request.json()) as List;

  let list;
  try {
    list = await db.list.update({
      where: {
        id,
        board: {
          userId: user.id,
        },
      },
      data: { title },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка выполнения!" },
      { status: 400 }
    );
  }
}
