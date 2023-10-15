"use client";
/**
 * Client Only
 */
import type { BackendRequest } from "../types";

export async function clientAuthFetch(request: BackendRequest) {
  return await fetch("/api/client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}
