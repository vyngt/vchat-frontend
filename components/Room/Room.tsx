import { Room } from "./types";
import { RoomItem } from "./RoomItem";

export function RoomNav({
  rooms,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { rooms: Array<Room> }) {
  return (
    <div {...rest} className={`${rest.className} flex flex-col`}>
      {rooms.map((room) => (
        <RoomItem key={room.id} room={room} />
      ))}
    </div>
  );
}
