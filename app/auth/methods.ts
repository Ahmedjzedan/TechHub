import { db } from "@/db";
import { users, sessions } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { addDays } from "date-fns";
import { cookies } from "next/headers";

interface AuthResult {
  success: boolean;
  error?: string;
}

// --- SIGN UP METHOD ---
export async function signUp({
  name,
  email,
  password,
}: Record<string, string>): Promise<AuthResult> {
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (existingUser) {
      return {
        success: false,
        error: "A user with this email already exists.",
      };
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await db.insert(users).values({
      name: name,
      email: email,
      passwordHash: passwordHash,
    });

    return { success: true };
  } catch (error) {
    console.error("Sign-up error:", error);
    return {
      success: false,
      error: "Could not create user. Please try again.",
    };
  }
}

// --- SIGN IN METHOD ---
export async function signIn({
  email,
  password,
}: Record<string, string>): Promise<AuthResult> {
  const cookieStore = await cookies();
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) {
      return { success: false, error: "Invalid email or password." };
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!isPasswordCorrect) {
      return { success: false, error: "Invalid email or password." };
    }

    // Create the session
    const sessionToken = crypto.randomBytes(40).toString("hex");
    const expiresAt = addDays(new Date(), 30);

    await db.insert(sessions).values({
      userId: existingUser.id,
      sessionToken: sessionToken,
      expiresAt: expiresAt,
    });

    // Set the secure cookie
    cookieStore.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    console.log("Sign in success");
    return { success: true };
  } catch (error) {
    console.error("Sign-in error:", error);
    return { success: false, error: "Could not sign in. Please try again." };
  }
}
