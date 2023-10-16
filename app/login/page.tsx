import { cookies } from "next/headers";

export default function Page() {
  const csrf = cookies().get("next-auth.csrf-token")?.value.split("|")[0];
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="mb-3 text-center text-4xl">
        <strong>Sign In</strong>
      </div>
      <div className="flex justify-center">
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="flex w-[600px] flex-col gap-6"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrf} />
          <label>
            <strong>Username</strong>
            <div className="h-10 rounded-md border-primary bg-primary/20">
              <input
                name="username"
                type="text"
                className="v-input h-full w-full"
              />
            </div>
          </label>
          <label>
            <strong>Password</strong>
            <div className="h-10 rounded-md border-primary bg-primary/20">
              <input
                name="password"
                type="password"
                className="v-input h-full w-full"
              />
            </div>
          </label>
          <div className="flex justify-center">
            <button
              className="rounded-md border-2 border-primary p-2 transition-colors hover:bg-primary hover:text-background"
              type="submit"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
