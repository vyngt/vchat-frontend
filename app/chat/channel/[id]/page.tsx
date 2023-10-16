"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { Message } from "@/components/Message";
import { MessageItem } from "@/components/Message";
import { clientAuthFetch } from "@/lib/auth";
import "./styles.css";

export default function Page({ params }: { params: { id: number } }) {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const chatContainer = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainer && chatContainer.current) {
      chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
    }
  }, []);

  const addMessage = useCallback((msg: Message) => {
    setMessages((cur) => [...cur, msg]);
  }, []);

  const fetchMessages = useCallback(async () => {
    const resp = await clientAuthFetch({
      endpoint: `chat/channel/${params.id}/messages`,
      method: "GET",
    });
    const data: Array<Message> = await resp.json();

    setMessages(data);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const evs = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chat/channel/${params.id}`,
      { withCredentials: true }
    );

    evs.onopen = (ev) => {};

    evs.onmessage = (ev: MessageEvent<string>) => {
      const data: Message = JSON.parse(ev.data);
      addMessage(data);
    };

    evs.onerror = (ev) => {
      console.log("Error", ev);
    };

    return () => evs.close();
  }, [addMessage]);

  return (
    <div className="chat-container" ref={chatContainer}>
      {messages.map((m) => (
        <MessageItem key={m.id} message={m} />
      ))}
    </div>
  );
}
