"use client";

import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

const initialState = {
  errors: {},
  values: {
    title: "",
    author: "",
    url: "",
  },
  success: false,
};

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Create new blog</h2>
      <form className="flex flex-col gap-4" action={formAction}>
        <div>
          <label className="flex gap-2 items-center">
            Title
            <input
              className="px-2 py-1 rounded-sm border border-gray-800 bg-white"
              type="text"
              name="title"
              defaultValue={state.values?.title}
            />
          </label>
          {state.errors?.title && (
            <p style={{ color: "red" }}>{state.errors.title}</p>
          )}
        </div>
        <div>
          <label className="flex gap-2 items-center">
            Author
            <input
              className="px-2 py-1 rounded-sm border border-gray-800 bg-white"
              type="text"
              name="author"
              defaultValue={state.values?.author}
            />
          </label>
          {state.errors?.author && (
            <p style={{ color: "red " }}>{state.errors.author}</p>
          )}
        </div>
        <div>
          <label className="flex gap-2 items-center">
            URL
            <input
              className="px-2 py-1 rounded-sm border border-gray-800 bg-white"
              type="text"
              name="url"
              defaultValue={state.values?.url}
            />
          </label>
          {state.errors?.url && (
            <p style={{ color: "red " }}>{state.errors.url}</p>
          )}
        </div>
        <button
          className="w-max border rounded-sm px-2 py-1 bg-olive-200 cursor-pointer hover:bg-olive-100"
          type="submit"
          data-testid="create-blog-button"
        >
          Create
        </button>
      </form>
    </div>
  );
}
