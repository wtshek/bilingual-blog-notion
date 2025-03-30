"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { useEffect, useState } from "react";
import { BlogPost } from "@/types/blog";
import { useLanguage } from "@/lib/language";

export default function BlogPage() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t("blog.allPosts")}</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="border-b pb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600"
                >
                  {post.title}
                </Link>
              </h2>
              <span className="text-gray-500 text-sm">
                {t("blog.publishedAt")} {formatDate(post.publishedAt)}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                {post.category.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/categories/${cat.name}`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {t("blog.readMore")} →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
