/**
 * Server Only
 */
import type { BackendRequest } from "../types";
import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

export async function serverAuthFetch(request: BackendRequest) {
  const session = await getServerSession(authOptions);

  return await fetch("http://localhost:3000/api/server", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify(request),
  });
}
