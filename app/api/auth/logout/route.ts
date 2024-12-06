import { NextResponse } from "next/server";

import { currentUser } from "@/lib/auth";
import { signOut } from "@/auth";

export async function POST() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не авторизован!" },
      { status: 401 }
    );
  }

  await signOut();

  return NextResponse.json({ message: "Успешный выход!" });
}
