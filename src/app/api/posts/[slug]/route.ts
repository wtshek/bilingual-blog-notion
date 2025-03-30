import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/lib/notion";
import { Language } from "@/lib/language";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get("lang");

  const post = await getPost(lang as Language);
  if (post) {
    return NextResponse.json(post);
  } else {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}
