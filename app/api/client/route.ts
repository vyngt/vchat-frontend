import type { BackendRequest } from "@/lib/auth";

export async function POST(request: Request) {
  const headers = {
    "Content-Type": "application/json",
  };

  const data: BackendRequest = await request.json();
  const requestBody: RequestInit = {
    method: data.method,
    headers: {
      ...headers,
    },
  };

  if (data.method != "GET") {
    requestBody.body = data.body;
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/${data.endpoint}`,
    requestBody
  );
  return response;
}
