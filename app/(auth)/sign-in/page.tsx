/* eslint-disable @next/next/no-img-element */

"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  // const [error, setError] = useState<string | null>(null);
  // const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/lists");
    // const formData = new FormData(e.target as HTMLFormElement);
    // const email = formData.get("email") as string;
    // const password = formData.get("password") as string;

    // if (!email || !password) {
    //   setError("Email and password are required");
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   setError(null);

    //   const response = await fetch("/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();

    //   if (!response.ok) {
    //     setError(data.message || "Login failed");
    //     return;
    //   }

    //   localStorage.setItem("token", data.token);

      
    //   router.push("/lists");
    // } catch (err) {
    //   console.error(err);
    //   setError("Something went wrong. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/logo.png"
           className="mx-auto w-16 sm:w-24 md:w-32 lg:w-40 h-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
       <p className="text-red-500 text-center mb-4"></p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
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
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
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
             SignIn
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?{' '}
          <a href="/sign-up" className="font-semibold text-indigo-600 hover:text-indigo-500">
           SignUp
          </a>
        </p>
      </div>
    </div>
  );
}
