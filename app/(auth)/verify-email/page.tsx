"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyEmailAction } from "@/actions/auth/verify";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatus("error");
        setMessage("Invalid verification link");
        return;
      }

      try {
        const response = await verifyEmailAction(token);

        if (response.success) {
          setStatus("success");
          setMessage("Email verified successfully! Redirecting to login...");
          // Перенаправляем на страницу входа через 3 секунды
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(response.toString || "Verification failed");
        }
      } catch (error) {
        console.log(error);
        setStatus("error");
        setMessage("An error occurred during verification");
        console.error(e);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p
          className={`${
            status === "error"
              ? "text-red-500"
              : status === "success"
                ? "text-green-500"
                : "text-gray-600"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
