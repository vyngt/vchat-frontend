"use client";

import Link from "next/link";
import { Room } from "./types";
import { usePathname } from "next/navigation";

export function RoomItem({ room }: { room: Room }) {
  const current = usePathname();
  const pathname = `/chat/channel/${room.id}`;
  return (
    <Link
      className={`h-10 flex flex-col justify-center rounded-md transition-colors ${
        current == pathname
          ? "bg-sidebar-selected"
          : "hover:bg-sidebar-selected/80"
      }`}
      href={pathname}
    >
      <div className="p-2">{room.name}</div>
    </Link>
  );
}
