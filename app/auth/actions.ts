"use server";

import { redirect } from "next/navigation";
import { signIn, signUp } from "@/app/auth/methods"; // 👈 Import our new methods
import { cookies } from "next/headers";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { sessions } from "@/db/schema";

export interface AuthState {
  errors?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    api?: string;
  };
}

export async function authenticate(
  prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const mode = formData.get("mode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  // --- Start of Form Validation ---
  const errors: AuthState["errors"] = {};
  if (mode === "signup") {
    if (name.length < 2)
      errors.name = "Full name must be at least 2 characters.";
    if (name.length > 50)
      errors.name = "Full name cannot exceed 50 characters.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!password || password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }
  if (mode === "signup" && password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (Object.keys(errors).length > 0) {
    return { errors };
  }
  // --- End of Form Validation ---

  let result;
  if (mode === "signin") {
    result = await signIn({ email, password });
  } else {
    result = await signUp({ name, email, password });
  }

  if (!result.success) {
    return { errors: { api: result.error } };
  }

  // On success, redirect the user
  redirect("/");
}

export async function logoutAction() {
  const cookie = await cookies();
  const sessionToken = cookie.get("session_token")?.value;

  if (sessionToken) {
    try {
      // Delete the session from the database
      await db.delete(sessions).where(eq(sessions.sessionToken, sessionToken));
    } catch (error) {
      console.error("Failed to delete session from DB:", error);
    }
  }

  // Clear the cookie
  cookie.set("session_token", "", {
    expires: new Date(0),
    path: "/",
  });

  // Redirect to the homepage
  redirect("/");
}
