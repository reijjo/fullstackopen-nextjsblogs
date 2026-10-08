"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type NotificationType = "success" | "error";

type NotificationContextType = {
  message: string;
  type: NotificationType;
  showNotification: (message: string, type?: NotificationType) => void;
};

type NotificationProviderProps = {
  children: ReactNode;
};

const NotificationContext = createContext<NotificationContextType>({
  message: "",
  type: "success",
  showNotification: () => {},
});

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("success");

  const showNotification = (
    msg: string,
    notifType: NotificationType = "success",
  ) => {
    setMessage(msg);
    setType(notifType);
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <NotificationContext value={{ message, type, showNotification }}>
      {children}
    </NotificationContext>
  );
};

export const useNotification = () => useContext(NotificationContext);
