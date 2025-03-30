"use client";

import { useState, useEffect } from "react";
import { BlogPost, Category } from "@/types/blog";
import { useParams } from "next/navigation";
import HomePageLayout from "./_components/HomePageLayout";

export default function HomePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { lang } = useParams();

  useEffect(() => {
    async function fetchPosts() {
      const { posts, categories } = await fetch(`api/posts?lang=${lang}`).then(
        (res) => res.json()
      );
      setCategories(categories);
      setPosts(posts);
    }
    fetchPosts();
  }, [lang]);

  return <HomePageLayout posts={posts} categories={categories} />;
}
