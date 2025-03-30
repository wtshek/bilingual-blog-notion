"use client";

import Link from "next/link";
import { BlogPost, Category } from "@/types/blog";
import { useLanguage } from "@/lib/language";

interface HomePageLayoutProps {
  posts: BlogPost[];
  categories: Category[];
}

export default function HomePageLayout({
  posts,
  categories,
}: HomePageLayoutProps) {
  const { t } = useLanguage();

  return (
    <main className="container mx-auto px-4 py-8 sm:flex-col md:flex md:flex-row">
      {/* Left Column */}
      <aside className="md:w-1/4 pr-4 mb-10">
        <nav>
          <ul className="space-y-4 flex gap-5 md:block text-gray-600 overflow-scroll">
            {categories.map((category) => (
              <li key={category.id} className="whitespace-nowrap">
                <Link href={`/category/${category.slug}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Right Column */}
      <section className="md:w-3/4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article key={post.id} className="w-full md:p-4">
              <p className="text-sm text-gray-500 mb-2">
                {Array.isArray(post.category)
                  ? post.category.map((cat) => cat.name).join(", ")
                  : post.category}
              </p>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <p className="text-sm text-gray-500 mb-4">{post.publishedAt}</p>
              <Link
                href={`/blog/${encodeURIComponent(
                  post.slug
                )}?id=${encodeURIComponent(post.id)}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {t("blog.readMore")} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
