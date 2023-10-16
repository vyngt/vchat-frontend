import type { BackendRequest } from "@/lib/auth";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const access_token = session?.access_token ? session.access_token : "";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
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
