import { RoomNav, RoomBody } from "@/components/Room";
import type { Room } from "@/components/Room";
import { serverAuthFetch } from "@/lib/auth";
import "./styles.css";

export const metadata = {
  title: "VChat",
  description: "Channels of VChat",
};

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const resp = await serverAuthFetch({
      method: "GET",
      endpoint: "rooms",
    });

    const rooms: Array<Room> = await resp.json();

    return (
      <div className="h-full w-full">
        <RoomNav className="sidebar-room gap-2 w-60 p-2" rooms={rooms} />
        <RoomBody className="pl-64 p-2 h-full">{children}</RoomBody>
      </div>
    );
  } catch {
    return <div>Something went wrong!!!</div>;
  }
}
