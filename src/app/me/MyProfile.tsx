"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <div
      className="border-b flex flex-col gap-1 py-3 pb-6"
      data-testid="user-profile"
    >
      <h2 className="text-3xl font-bold">My Profile</h2>
      <div className="flex gap-2">
        <h3 className="font-semibold">Name:</h3>
        <p data-testid="user-name">{session?.user?.name}</p>
      </div>
      <div className="flex gap-2">
        <h3 className="font-semibold">Username:</h3>
        <p data-testid="user-username">{session?.user?.email}</p>
      </div>
    </div>
  );
}
