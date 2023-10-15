"use client";

import { useEffect, useState, useCallback } from "react";
import type { Message } from "@/components/Message";
import { MessageItem, MessageInput } from "@/components/Message";

import { clientAuthFetch } from "@/lib/auth";

export default function Page({ params }: { params: { id: number } }) {
  const [messages, setMessages] = useState<Array<Message>>([]);

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

  const sendMessage = useCallback(async (value: string) => {
    try {
      const resp = await clientAuthFetch({
        endpoint: "chat/message",
        method: "POST",
        body: JSON.stringify({ room_id: Number(params.id), content: value }),
      });
    } catch (err) {
      console.log("Error SendMSG", err);
    }
  }, []);

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
    <>
      <div>
        {messages.map((m) => (
          <MessageItem message={m} />
        ))}
      </div>
      <MessageInput sendMessage={sendMessage} />
    </>
  );
}
