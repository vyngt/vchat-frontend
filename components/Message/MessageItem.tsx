import type { Message } from "./types";

export function MessageItem({ message }: { message: Message }) {
  return (
    <div className="flex w-full gap-1">
      <div>
        <strong>{message.user.username}</strong>:
      </div>
      <div>{message.content}</div>
    </div>
  );
}
