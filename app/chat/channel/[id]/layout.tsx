import { MessageBody, MessageInput } from "@/components/Message";
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
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  return (
    <MessageBody className="flex flex-col justify-between h-full gap-3">
      {children}
      <MessageInput params={params} />
    </MessageBody>
  );
}
