import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full flex flex-col justify-center">
      <div className="flex justify-center">
        <Link
          href="/chat"
          className="border-2 border-primary p-4 rounded-lg font-serif text-lg bg-primary text-background"
        >
          Let&apos;s chat
        </Link>
      </div>
    </div>
  );
}
