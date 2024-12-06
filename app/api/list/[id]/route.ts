import { NextRequest, NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
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

  const boardId = params.id;

  if (!boardId) {
    return NextResponse.json([]);
  }

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        userId: user?.id,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "desc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return NextResponse.json(lists);
}

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
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        board: {
          userId: user.id,
        },
      },
    });

    let lists = await db.list.findMany({
      where: { boardId: list.boardId },
      orderBy: { order: "asc" },
    });

    const transaction = lists.map((list, index) =>
      db.list.update({
        where: {
          id: list.id,
        },
        data: {
          order: index + 1,
        },
      })
    );

    lists = await db.$transaction(transaction);
    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка удаления списка!" },
      { status: 400 }
    );
  }
}
