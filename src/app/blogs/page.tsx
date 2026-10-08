import Link from "next/link";
import { filterBlogByTitle, getBlogs } from "../services/blogs";

type BlogsProps = {
  searchParams: Promise<{ filter?: string }>;
};

export default async function Blogs({ searchParams }: BlogsProps) {
  const { filter } = await searchParams;

  const allBlogs = await getBlogs();
  const mostLikesOnTop = allBlogs.sort((a, b) => b.likes - a.likes);

  const blogs = filterBlogByTitle(mostLikesOnTop, filter);

  return (
    <main className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Blogs</h2>
      <form className="flex gap-2">
        <input
          className="px-2 py-1 rounded-sm border border-gray-800 bg-white"
          type="text"
          placeholder="Search a blog"
          name="filter"
          data-testid="filter-input"
        />
        <button
          className="border rounded-sm px-2 py-1 bg-olive-200 cursor-pointer hover:bg-olive-100"
          type="submit"
          data-testid="search-button"
        >
          Search
        </button>
      </form>
      <ul className="space-y-4" data-testid="blogs-list">
        {blogs.map((blog) => (
          <li
            className="border rounded p-2 cursor-pointer bg-white hover:bg-olive-100 shadow-md"
            key={blog.id}
          >
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <p data-testid="blog-detail">
              by {blog.author} - {blog.likes} likes
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
