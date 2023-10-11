"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";

interface User {
  username: string;
}

interface Message {
  username: string;
  message: string;
  room: string;
}

function Chat({ user }: { user: User }) {
  const [msg, setMsg] = useState<Array<Message>>([]);
  const addMsg = useCallback(
    (data: Message) => setMsg((cur) => [...cur, data]),
    []
  );

  const ref = useRef<HTMLInputElement>(null);
  const sendMsg = async () => {
    if (ref && ref.current && ref.current.value.trim() != "") {
      const data: Message = {
        username: user.username,
        message: ref.current.value.trim(),
        room: "a",
      };
      ref.current.value = "";
      const _resp = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/message`,
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    }
  };

  useEffect(() => {
    const evs = new EventSource(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
      { withCredentials: true }
    );
    console.log("Initializing", evs);

    evs.onopen = (ev) => {
      console.log("Connected", ev);
    };

    evs.onmessage = (ev: MessageEvent<string>) => {
      console.log("Message", ev);
      const data: Message = JSON.parse(ev.data);
      addMsg(data);
    };

    evs.onerror = (ev) => {
      console.log("Error", ev);
    };

    console.log(evs.readyState);

    return () => evs.close();
  }, [user.username, addMsg]);

  return (
    <div className="border border-secondary h-96 w-full p-2">
      <label>
        Msg: <input ref={ref} type="text" />
      </label>
      <button onClick={sendMsg}>Send</button>
      <div>
        {msg.map((m, idx) => (
          <div
            className="p-1 border  border-primary"
            key={`${m.username}-${idx}`}
          >
            {m.username}: {m.message}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const ref = useRef<HTMLInputElement>(null);

  const [count, setCount] = useState(0);

  const trigger = useCallback(() => {
    console.log("Triggered");
  }, []);

  useEffect(() => {
    trigger();
    console.log("Inside useEffect");
  }, [trigger]);

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount((cur) => cur + 1)}>Increase</button>
      <button onClick={trigger}>Trigger</button>
    </div>
  );
}
