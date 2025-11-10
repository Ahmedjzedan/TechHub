import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { sessions } from "@/db/schema";

export const runtime = "nodejs";

const protectedPaths = ["/orders", "/userinfo", "/wishlist"];
const publicOnlyPaths = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("session_token")?.value;

  // 1. Check the DB for a valid session
  let isAuthenticated = false;
  if (sessionToken) {
    try {
      const session = await db.query.sessions.findFirst({
        where: eq(sessions.sessionToken, sessionToken),
      });

      // We only check for existence and expiration
      if (session && new Date() < session.expiresAt) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.error("Middleware DB query failed:", error);
    }
  }

  // 2. Handle Protected Routes
  if (isVisiting(pathname, protectedPaths) && !isAuthenticated) {
    // Redirect unauthenticated users
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set("session_token", "", { expires: new Date(0) });
    return response;
  }

  // 3. Handle Public-Only Routes
  if (isVisiting(pathname, publicOnlyPaths) && isAuthenticated) {
    // Redirect authenticated users
    return NextResponse.redirect(new URL("/", request.url));
  }

  // All good, continue to the page
  return NextResponse.next();
}

/**
 * Helper function to check if the current path matches a list
 */
function isVisiting(pathname: string, paths: string[]): boolean {
  return paths.some((path) => pathname.startsWith(path));
}

// --- THIS IS THE MOST IMPORTANT FIX ---
// This matcher is specific. It ONLY runs on the pages we've defined
// and avoids all API routes, static files, and internal requests.
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/orders/:path*",
    "/userinfo/:path*",
    "/wishlist/:path*",
    "/signin",
    "/signup",
  ],
};
