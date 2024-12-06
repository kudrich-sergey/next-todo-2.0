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

  let list;
  try {
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        board: {
          userId: user.id,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return NextResponse.json(
        { message: "Список не найден!" },
        { status: 400 }
      );
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId: listToCopy.boardId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    const lists = await db.list.findMany({
      where: {
        boardId: listToCopy.boardId,
      },
      orderBy: { order: "asc" },
      select: { title: true },
    });

    const similarCopyList = lists.filter((list) =>
      list.title.includes(listToCopy.title)
    );

    const newTitle = `${similarCopyList[0].title} (${similarCopyList.length})`;

    list = await db.list.create({
      data: {
        title: newTitle,
        order: newOrder,
        color: listToCopy.color,
        background: listToCopy.background,
        board: {
          connect: {
            id: listToCopy.boardId,
          },
        },
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              order: card.order,
              isCompleted: card.isCompleted,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка копирования списка!" },
      { status: 400 }
    );
  }
}
