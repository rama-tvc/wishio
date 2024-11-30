"use client"

import { signIn, useSession } from "next-auth/react"
import React from "react"

const Dashboard = () =>{
    const {data: session} = useSession();
    if (!session) {
        return (
          <div className="flex flex-col items-center mt-12">
            <h2 className="text-2xl font-semibold">Вход в систему</h2>
            <p className="text-center mt-2">Для продолжения, войдите через Google:</p>
            <button
              onClick={() => signIn("google")}
              className="mt-4 px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md focus:outline-none"
            >
              Войти через Google
            </button>
          </div>
        );
      }
}

export default Dashboard;