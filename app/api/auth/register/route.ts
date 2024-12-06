import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { IAuthForm } from "@/components/form-auth/form.interface";
import { signIn } from "@/auth";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as IAuthForm;

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({
      message: "Электронная почта уже используется!",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  try {
    await signIn("credentials", {
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json({ message: "Неверные учетные данные!" });
        default:
          return NextResponse.json({ message: "Неверные учетные данные!" });
      }
    }

    throw error;
  }
}
