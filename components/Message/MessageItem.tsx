import type { Message } from "./types";

export function MessageItem({ message }: { message: Message }) {
  return <div>{message.content}</div>;
}
