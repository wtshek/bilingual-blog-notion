"use client";
import { useSearchParams } from "next/navigation";

export type Language = "en" | "zh";

const translations = {
  en: {
    "nav.home": "Home",
    "nav.blog": "Blog",
    "nav.categories": "Categories",
    "blog.readMore": "Read more",
    "blog.allPosts": "All Blog Posts",
    "blog.publishedAt": "Published at",
    "categories.tech": "Tech",
    "categories.lifestyle": "Lifestyle",
    "categories.travel": "Travel",
  },
  zh: {
    "nav.home": "首页",
    "nav.blog": "博客",
    "nav.categories": "分类",
    "blog.readMore": "阅读更多",
    "blog.allPosts": "所有文章",
    "blog.publishedAt": "发布于",
    "categories.tech": "科技",
    "categories.lifestyle": "生活方式",
    "categories.travel": "旅行",
  },
} as const;

export function useLanguage(): {
  t: (key: keyof typeof translations.en) => string;
} {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  return {
    t: (key: keyof typeof translations.en) =>
      translations[lang as Language][key],
  };
}
