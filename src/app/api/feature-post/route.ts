import { NextRequest, NextResponse } from "next/server";
import { getFeaturedPosts } from "@/lib/notion";
import { Language } from "@/lib/language";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get("lang");

  const posts = await getFeaturedPosts(lang as Language);
  return NextResponse.json(posts);
}
