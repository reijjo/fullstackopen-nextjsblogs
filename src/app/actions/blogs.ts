"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  addBlog,
  addLike,
  addToReadingList,
  markAsRead,
} from "../services/blogs";
import { auth } from "@/auth";

type BlogFormState = {
  errors?: {
    title?: string;
    author?: string;
    url?: string;
  };
  values?: {
    title: string;
    author: string;
    url: string;
  };
  success: boolean;
};

export const createBlog = async (
  _prevState: BlogFormState,
  formData: FormData,
): Promise<BlogFormState> => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: BlogFormState["errors"] = {};

  if (!title || title.length < 5) {
    errors.title = "Title must have at least 5 characters.";
  }

  if (!author || author.length < 5) {
    errors.author = "Author must have at least 5 characters.";
  }

  if (!url || url.length < 5) {
    errors.url = "Url must have at least 5 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: {
        title,
        author,
        url,
      },
      success: false,
    };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  return { errors: {}, success: true };
};

export const addLikeToBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await addLike(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const addBlogToReadingList = async (formData: FormData) => {
  const id = Number(formData.get("blogId"));

  await addToReadingList(id);

  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const markBlogAsRead = async (formData: FormData) => {
  const id = Number(formData.get("blogId"));

  await markAsRead(id);

  revalidatePath(`/me`);
};
