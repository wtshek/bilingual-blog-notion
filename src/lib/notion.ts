import { Client } from "@notionhq/client";
import { BlogPost, Category, NotionPage } from "@/types/blog";
import { Language } from "./language";

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

enum LanguageEnum {
  zh = "Chinese",
  en = "English",
}

export async function getPostsAndCategories(
  lang: Language = "en"
): Promise<{ posts: BlogPost[]; categories: Category[] }> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID!,
    filter: {
      and: [
        {
          property: "progress",
          status: {
            equals: "Published",
          },
        },
        {
          property: "language",
          select: {
            equals: LanguageEnum[lang] || "English",
          },
        },
      ],
    },
  });

  const posts = (response.results as NotionPage[]).map(transformNotionPost);

  const categoryMap = new Map<
    string,
    { count: number; id: string; name: string; slug: string }
  >();

  posts.forEach((post) => {
    post.category.forEach(({ id, name, slug }) => {
      const entry = categoryMap.get(id);
      if (entry) {
        entry.count += 1;
      } else {
        categoryMap.set(id, { count: 1, id, name, slug });
      }
    });
  });

  const categories = Array.from(categoryMap.values()).map(
    ({ id, name, count, slug }) => ({
      name,
      slug,
      count,
      id,
    })
  );

  return { posts, categories };
}

export async function getFeaturedPosts(
  lang: Language = "en"
): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID!,
    filter: {
      and: [
        {
          property: "featured",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "language",
          select: {
            equals: LanguageEnum[lang] || "English",
          },
        },
      ],
    },
  });

  return (response.results as NotionPage[]).map(transformNotionPost);
}

export async function getPost(
  slug: string
): Promise<(BlogPost & { blocks: any }) | null> {
  try {
    // Fetch the page metadata
    const page = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "title",
        rich_text: { equals: decodeURIComponent(slug) },
      },
    });

    const post = page.results[0];

    const data = await fetch(
      `https://notion-api.splitbee.io/v1/page/${post.id}`
    ).then((res) => res.json());

    return {
      ...transformNotionPost(post as any),
      blocks: data,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

function transformNotionPost(page: NotionPage): BlogPost {
  return {
    id: page.id,
    title: page.properties.title.title[0].plain_text,
    slug: page.properties.title.title[0].plain_text,
    category: page.properties.category.multi_select.map((select) => ({
      id: select.id,
      name: select.name,
      slug: select.name.toLowerCase().replace(/\s+/g, "-"),
    })),
    description: page.properties.abstract.rich_text[0]?.plain_text,
    publishedAt: page.properties.date.date.start,
  };
}
