"use client";

import { signOut, useSession } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="w-full bg-olive-600 p-4 text-white flex justify-between">
      <div className="flex gap-4 items-center">
        <NavLink href="/">home</NavLink>
      </div>
      <div className="flex items-center gap-4">
        <NavLink href="/blogs">blogs</NavLink>
        <NavLink href="/users">users</NavLink>
        {session ? (
          <>
            <NavLink href="/blogs/new">create blog</NavLink>
            <NavLink href="/me">me</NavLink>
            <button
              className="bg-red-200 px-2 py-1 rounded text-sm text-black hover:bg-red-300 cursor-pointer"
              onClick={() => signOut()}
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">login</NavLink>
            <NavLink href="/register">register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
