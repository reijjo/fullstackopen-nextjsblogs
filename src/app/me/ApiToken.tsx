"use client";
import { useSession } from "next-auth/react";
import { generateToken } from "../actions/me";

export default function ApiToken() {
  const { data: session, update } = useSession();

  const handleGenerateToken = async () => {
    await generateToken();
    await update({});
  };

  return (
    <form action={handleGenerateToken}>
      <div
        className="flex flex-col gap-1 py-3 pt-6"
        data-testid="api-token-section"
      >
        <h2 className="text-3xl font-bold">API Token</h2>
        <div className="bg-olive-200 px-6 py-3 rounded-md flex flex-col gap-1">
          {session?.user?.token ? (
            <>
              <p className="text-lg" data-testId="token-display">
                Current token:
              </p>
              <p
                className="bg-olive-100 px-4 py-2 rounded-sm"
                data-testid="api-token"
              >
                {session?.user?.token}
              </p>
            </>
          ) : (
            <p className="text-lg" data-testid="no-token-message">
              Generate a token for yourself
            </p>
          )}
        </div>
      </div>
      <button
        className="border rounded-sm px-2 py-1 bg-olive-200 cursor-pointer hover:bg-olive-100"
        data-testid="generate-token-button"
      >
        Generate New Token
      </button>
    </form>
  );
}
