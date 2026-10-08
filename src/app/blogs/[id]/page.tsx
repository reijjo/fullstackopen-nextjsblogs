import { addBlogToReadingList, addLikeToBlog } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import { getCurrentUser } from "@/app/services/session";
import { notFound } from "next/navigation";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlogById(Number(id));
  const user = await getCurrentUser();

  if (!blog) {
    notFound();
  }

  const isInReadingList = blog.readingList.some((b) => b.userId === user?.id);

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-2 border border-gray-500 rounded-md bg-olive-50 my-8">
      <h2 className="text-2xl font-bold" data-testId="blog-title">
        {blog.title}
      </h2>
      <h3 className="text-xl" data-testId="blog-author">
        by {blog.author}
      </h3>
      <p>{blog.url}</p>
      <p data-testId="blog-detail">{blog.likes} likes</p>
      <div className="flex gap-4">
        <form action={addLikeToBlog} className="flex gap-4">
          <input type="hidden" name="id" value={blog.id} />
          <button
            className="border rounded-sm px-4 py-2 bg-olive-800 cursor-pointer hover:bg-olive-700 text-white"
            type="submit"
          >
            Like this blog
          </button>
        </form>

        {blog.userId !== user?.id ? (
          <form action={addBlogToReadingList}>
            <input type="hidden" name="blogId" value={blog.id} />
            <button
              className="border rounded-sm px-4 py-2 bg-olive-200 cursor-pointer hover:bg-olive-100 disabled:bg-gray-400"
              type="submit"
              disabled={isInReadingList ? true : false}
              data-testId="add-to-reading-list-button"
            >
              {!isInReadingList ? "Add to reading list" : "already in list"}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
