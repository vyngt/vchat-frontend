"use client";
/**
 * Client Only
 */
import type { BackendRequest } from "../types";

async function basicFetch(endpoint: string, request: BackendRequest) {
  return await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
}

export async function clientAuthFetch(request: BackendRequest) {
  return await basicFetch("/api/client/auth", request);
}

export async function clientFetch(request: BackendRequest) {
  return await basicFetch("/api/client", request);
}
