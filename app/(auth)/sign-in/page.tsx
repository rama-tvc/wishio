/* eslint-disable @next/next/no-img-element */

"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/wishes");
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
          className="mx-auto w-16 sm:w-24 md:w-32 lg:w-40 h-auto"
        />
      </div>

      <div className="max-w-lg w-full  bg-white rounded-lg shadow-lg p-8 space-y-6 mr-20">
        {!session ? (
          <>
            <p className="text-red-500 text-center mb-4"></p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                >
                  Sign In
                </button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              <button
                onClick={() => signIn("google")}
                className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-400"
              >
                Sign in with Google
              </button>
              <button
                onClick={() => signIn("github")}
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-gray-700"
              >
                Sign in with GitHub
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              You are logged in as {session.user?.email}
            </p>
            <button
              onClick={() => signOut()}
              className="rounded-md bg-red-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Sign Out
            </button>
            <button
              onClick={() => router.push("/wishes")}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-500"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {!session && (
          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Not a member?{" "}
            <a
              href="/sign-up"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
