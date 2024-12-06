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
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        userId: user.id,
      },
    });

    return NextResponse.json(board);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка удаления доски!" },
      { status: 400 }
    );
  }
}
