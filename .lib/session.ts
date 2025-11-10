import "server-only"; // Ensures this code only runs on the server

import { cookies } from "next/headers";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { sessions } from "@/db/schema";

// This function can be called from any Server Component, Page, or Layout
export async function getCurrentUser() {
  const cookie = await cookies();
  const sessionToken = cookie.get("session_token")?.value;

  // If there's no token, there's no user
  if (!sessionToken) {
    return null;
  }

  // Find the session in the database
  const session = await db.query.sessions.findFirst({
    where: eq(sessions.sessionToken, sessionToken),
    // Use Drizzle's relational query to also fetch the user data
    with: {
      user: true,
    },
  });

  // If the session doesn't exist or is expired, the user is not signed in
  if (!session || new Date() > session.expiresAt) {
    return null;
  }

  // If the session is valid, return the user object
  return session.user;
}
