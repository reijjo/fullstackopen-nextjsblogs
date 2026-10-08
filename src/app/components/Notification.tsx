"use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div
      className={`${type === "success" ? "bg-[#16a34a]" : "bg-[#dc2626]"} px-4 py-2 mb-3 text-white rounded-xl`}
      data-testid="notification"
    >
      {message}
    </div>
  );
}
