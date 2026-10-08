import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { blogs, readingList } from "@/db/schema";
import { getCurrentUser } from "./session";

type Blogs = {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
};

export const getBlogs = () => {
  return db.query.blogs.findMany();
};

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }

  await db.insert(blogs).values({ title, author, url, userId: user!.id });
};

export const getBlogById = (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
    with: { readingList: true },
  });
};

export const addLike = async (id: number) => {
  const blog = await getBlogById(id);

  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id));
  }
};

export const filterBlogByTitle = (blogs: Blogs[], filter?: string) => {
  if (!filter) return blogs;

  return blogs.filter((blog) => blog.title.includes(filter));
};

export const addToReadingList = async (id: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }

  await db.insert(readingList).values({ userId: user.id, blogId: id });
};

export const getReadingListByUserId = async (id: number) => {
  return db.query.readingList.findFirst({
    where: eq(readingList.userId, id),
  });
};

export const markAsRead = async (blogId: number) => {
  const user = await getCurrentUser();

  if (user) {
    await db
      .update(readingList)
      .set({ read: true })
      .where(
        and(eq(readingList.blogId, blogId), eq(readingList.userId, user.id)),
      );
  }
};
