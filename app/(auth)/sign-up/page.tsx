/* eslint-disable @next/next/no-img-element */

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center">
          <img
            alt="Your Company"
            src="/logo.png"
            className="mx-auto w-16 sm:w-20"
          />
          <h2 className="text-2xl font-extrabold text-gray-800 mt-4">
            {session ? `Welcome, ${session.user?.name}` : "Create Your Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to access all the features.
          </p>
        </div>

        {!session ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-indigo-600 text-white text-sm font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                onClick={() => signIn("google")}
                className="flex items-center space-x-2 bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-400"
              >
                <span>Sign up with Google</span>
              </button>
              <button
                onClick={() => signIn("github")}
                className="flex items-center space-x-2 bg-gray-800 text-white py-2 px-4 rounded-md shadow hover:bg-gray-700"
              >
                <span>Sign up with GitHub</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-gray-700">
              You are already signed in as {session.user?.email}.
            </p>
            <button
              onClick={() => router.push("/wishes")}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-500"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {!session && (
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/sign-in"
              className="font-semibold text-indigo-600 hover:underline"
            >
              Sign In
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
