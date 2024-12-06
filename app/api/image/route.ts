import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  let images;
  try {
    images = await db.images.findMany();

    if (images) {
      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
    }

    return NextResponse.json(images.slice(0, 9));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ошибка получения изображений!" },
      { status: 400 }
    );
  }
}
