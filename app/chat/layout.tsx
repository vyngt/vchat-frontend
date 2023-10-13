import { ListRoomComponent, Room } from "@/components/Room";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
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
    const session = await getServerSession(authOptions);
    const access_token = session?.access_token;
    const resp = await fetch(`${process.env.BACKEND_URL}/rooms`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    const rooms: Array<Room> = await resp.json();

    return (
      <div className="h-full w-full">
        <ListRoomComponent
          className="sidebar-room gap-2 w-60 p-2"
          rooms={rooms}
        />
        <div className="pl-64 p-2">{children}</div>
      </div>
    );
  } catch {
    return <div>Something went wrong!!!</div>;
  }
}
