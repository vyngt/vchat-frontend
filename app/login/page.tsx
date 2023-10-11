import { cookies } from "next/headers";

export default function LoginForm() {
  const csrf = cookies().get("next-auth.csrf-token")?.value.split("|")[0];
  return (
    <form method="post" action="/api/auth/callback/credentials">
      <input name="csrfToken" type="hidden" defaultValue={csrf} />
      <label>
        Username
        <input name="username" type="text" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button type="submit">Sign in</button>
    </form>
  );
}
