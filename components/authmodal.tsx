"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import Link from "next/link";

export const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();

  if (!isAuthModalOpen) return <></>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-white text-lg font-semibold">
          Зарегистрируйтесь, чтобы создать список желаний и поделиться с
          друзьями <br />
        </h2>

        <div className="mt-5 space-y-2">
          <Link href="/login">
            <button
              className="w-full bg-white text-black text-lg font-medium py-2 rounded-lg hover:bg-gray-200 transition"
              onClick={closeAuthModal}
            >
              Войти
            </button>
          </Link>
          <Link href="/register">
            <button
              className="w-full bg-gray-800 text-white text-lg font-medium py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={closeAuthModal}
            >
              Создать аккаунт
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
