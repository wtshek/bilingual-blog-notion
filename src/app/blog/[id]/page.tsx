import { notFound } from "next/navigation";
import { getPost } from "@/lib/notion";
import { NotionRenderer } from "react-notion";
import SocialMediaShare from "../_components/SocialMediaShare";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.id);
  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 w-3/4 relative">
      <aside className="w-fit p-4 mt-[200px] absolute -left-15 hidden md:block">
        <SocialMediaShare className="flex flex-col items-center space-y-4 mr-4" />
      </aside>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString()}
          </time>

          {post.category && (
            <>
              <span className="mx-2">•</span>
              <div className="flex gap-2">
                {post.category.map((category) => (
                  <span
                    key={category.id}
                    className="bg-gray-100 px-2 py-1 rounded-md text-sm"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
        <SocialMediaShare className="flex md:hidden mt-4 gap-4" />
      </header>

      <NotionRenderer blockMap={post.blocks} />
    </article>
  );
}
