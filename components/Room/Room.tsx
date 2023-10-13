import Link from "next/link";
import { Room } from "./types";

export function RoomComponent({ room }: { room: Room }) {
  return (
    <Link className="h-10 leading-[40px]" href={`/chat/channel/${room.id}/`}>
      {room.name}
    </Link>
  );
}

export function ListRoomComponent({
  rooms,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { rooms: Array<Room> }) {
  return (
    <div {...rest} className={`${rest.className} flex flex-col`}>
      {rooms.map((room) => (
        <RoomComponent key={room.id} room={room} />
      ))}
    </div>
  );
}
