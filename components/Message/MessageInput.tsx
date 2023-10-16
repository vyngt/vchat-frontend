"use client";
import { clientAuthFetch } from "@/lib/auth";
import { KeyboardEvent, useRef, useCallback, memo } from "react";

export const MessageInput = memo(function MessageInput({
  params,
}: {
  params: { id: number };
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(async (value: string) => {
    try {
      const _resp = await clientAuthFetch({
        endpoint: "chat/message",
        method: "POST",
        body: JSON.stringify({ room_id: Number(params.id), content: value }),
      });
    } catch (err) {
      console.log("Error SendMSG", err);
    }
  }, []);

  const performSend = () => {
    if (inputRef && inputRef.current) {
      const value = inputRef.current.value.trim();
      if (value.length > 0) {
        sendMessage(value);
      }

      inputRef.current.value = "";
    }
  };

  const handlerEnter = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == "Enter") {
      ev.preventDefault();
      performSend();
    }
  };

  return (
    <form className="border-primary bg-primary/20 rounded-md h-14">
      <input
        className="bg-transparent h-full w-full px-2"
        id="msg-input"
        ref={inputRef}
        placeholder="Text"
        type="text"
        onKeyDownCapture={handlerEnter}
      />
    </form>
  );
});
