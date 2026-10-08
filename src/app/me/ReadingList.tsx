import { getCurrentUser } from "../services/session";
import Link from "next/link";
import { getBlogById } from "../services/blogs";
import { markBlogAsRead } from "../actions/blogs";

export default async function ReadingList() {
  const user = await getCurrentUser();

  const blogsToRead = user?.readingList.filter((b) => b.read === false);
  const blogsRead = user?.readingList.filter((b) => b.read === true);

  const getBlogTitle = async (id: number) => {
    const blog = await getBlogById(id);
    return blog?.title;
  };

  return (
    <div
      className="border-b flex flex-col gap-1 py-3 pb-6"
      data-testid="reading-list-section"
    >
      <h2 className="text-3xl font-bold" data-testid="empty-reading-list">
        Reading List
      </h2>
      {blogsToRead && blogsToRead?.length > 0 ? (
        <div className="py-4" data-testId="unread-section">
          <h3 className="text-2xl font-bold">Unread ({blogsToRead.length})</h3>
          {blogsToRead.map((b) => (
            <form
              className="p-4 flex gap-4 align-center bg-amber-50"
              key={b.id}
              action={markBlogAsRead}
            >
              <input type="hidden" name="blogId" value={b.blogId} />
              <Link href={`/blogs/${b.blogId}`}>{getBlogTitle(b.blogId)}</Link>
              <button
                data-testid={`mark-read-${b.blogId}`}
                className="border rounded-sm px-2 py-1 bg-olive-200 cursor-pointer hover:bg-olive-100"
                type="submit"
              >
                Mark as read
              </button>
            </form>
          ))}
        </div>
      ) : (
        <div data-testid="no-unread-blogs">No unread blogs</div>
      )}

      {blogsRead && blogsRead.length > 0 && (
        <div className="py-4">
          <h3 className="text-2xl font-bold">Read ({blogsRead.length})</h3>
          {blogsRead.map((b) => (
            <div className="p-4 flex gap-4 align-center bg-green-50" key={b.id}>
              <Link href={`/blogs/${b.blogId}`}>{getBlogTitle(b.blogId)}</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
