import { NextRequest, NextResponse } from "next/server";
import { Board } from "@prisma/client";

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

  const { id, title } = (await request.json()) as Board;

  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        userId: user.id,
      },
      data: { title },
    });

    return NextResponse.json(board);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка выполнения!" },
      { status: 400 }
    );
  }
}
