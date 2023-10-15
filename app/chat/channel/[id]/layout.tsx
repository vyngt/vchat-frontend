import { MessageBody } from "@/components/Message";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: number } },
  _parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `VChat | Room ${params.id}`,
  };
}

export default function RoomInstanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MessageBody>{children}</MessageBody>;
}
