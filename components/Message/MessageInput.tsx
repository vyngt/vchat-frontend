"use client";

import { KeyboardEvent, useRef } from "react";
import { memo } from "react";

export const MessageInput = memo(function MessageInput({
  sendMessage,
}: {
  sendMessage: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

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
    <form className="border-primary bg-primary/20 rounded-md h-10">
      {/* <label htmlFor="msg-input"></label> */}
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
