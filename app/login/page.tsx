import { cookies } from "next/headers";

export default function Page() {
  const csrf = cookies().get("next-auth.csrf-token")?.value.split("|")[0];
  return (
    <div className="flex flex-col justify-center h-full">
      <div className="text-center text-4xl mb-3">
        <strong>Sign In</strong>
      </div>
      <div className="flex justify-center">
        <form
          method="post"
          action="/api/auth/callback/credentials"
          className="w-[600px] flex flex-col gap-6"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrf} />
          <label>
            <strong>Username</strong>
            <div className="border-primary bg-primary/20 rounded-md h-10">
              <input
                name="username"
                type="text"
                className="bg-transparent h-full px-2 w-full"
              />
            </div>
          </label>
          <label>
            <strong>Password</strong>
            <div className="border-primary bg-primary/20 rounded-md h-10">
              <input
                name="password"
                type="password"
                className="bg-transparent h-full px-2 w-full"
              />
            </div>
          </label>
          <div className="flex justify-center">
            <button
              className="border-2 border-primary rounded-md p-2 hover:text-background hover:bg-primary transition-colors"
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
