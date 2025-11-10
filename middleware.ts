import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { sessions } from "@/db/schema";

export const runtime = "nodejs";

const protectedPaths = [
  "/orders",
  "/dashboard",
  "/userinfo",
  "/account-settings",
];

// Define your public-only routes (routes a logged-in user should NOT see)
const publicOnlyPaths = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Get the session token from the user's cookies
  const sessionToken = request.cookies.get("session_token")?.value;

  // 2. Check the database for a valid, non-expired session
  let session = null;
  if (sessionToken) {
    try {
      session = await db.query.sessions.findFirst({
        where: eq(sessions.sessionToken, sessionToken),
      });
    } catch (error) {
      console.error("Middleware DB query failed:", error);
      // If the DB fails, assume no session for safety
    }
  }

  const isAuthenticated = session && new Date() < session.expiresAt;

  const isVisitingProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isVisitingProtectedPath && !isAuthenticated) {
    const homeUrl = new URL("/", request.url);

    const response = NextResponse.redirect(homeUrl);
    response.cookies.set("session_token", "", { expires: new Date(0) });
    return response;
  }

  // 5. Handle Public-Only Routes
  const isVisitingPublicOnlyPath = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isVisitingPublicOnlyPath && isAuthenticated) {
    // User is logged in but is trying to access the signin/signup page.
    // Redirect them to their dashboard.
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Config: This runs the middleware on all paths except static assets
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
