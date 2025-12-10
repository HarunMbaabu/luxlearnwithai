import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();

  // Shorten the URL
  if (url.pathname === "/learn-with-ai") {
    url.pathname = "/ask-ai";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next(); // Allow other requests to pass through
}
