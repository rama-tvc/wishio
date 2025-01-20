"use client";
import ButtonExpandList from "@/components/componentsEl/Buttons/buttonExpandList";
import { IsModalOpenProvider } from "@/components/componentsEl/Buttons/buttonLink";
import GeneralLayout from "@/components/componentsEl/Mainpage/ReduxMainpage";
import AddWishList from "@/components/componentsEl/WIshLists/addWishList";
import Link from "next/link";

function WishListPage() {
  return (
    <div>
      <GeneralLayout>
        <div className="shadow-md rounded-lg p-4 w-auto bg-white">
          <label
            htmlFor="lists"
            className="block text-lg font-medium text-gray-700 mb-4"
          >
            Выберите список:
          </label>
          <ul className="space-y-2">
            <li>
              <Link
                href="/wishes/1/1"
                className="block rounded-lg px-4 py-2 text-blue-600 hover:bg-gray-100 hover:text-blue-800 transition-colors duration-200"
              >
                Для друзей
              </Link>
            </li>
            <li>
              <Link
                href="/wishes/1/2"
                className="block rounded-lg px-4 py-2 text-blue-600 hover:bg-gray-100 hover:text-blue-800 transition-colors duration-200"
              >
                Для семьи
              </Link>
            </li>
            <li>
              <Link
                href="/wishes/1/3"
                className="block rounded-lg px-4 py-2 text-blue-600 hover:bg-gray-100 hover:text-blue-800 transition-colors duration-200"
              >
                Для второй половинки
              </Link>
            </li>
            <li>
              <Link
                href="/wishes/1/4"
                className="block rounded-lg px-4 py-2 text-blue-600 hover:bg-gray-100 hover:text-blue-800 transition-colors duration-200"
              >
                Для всех
              </Link>
            </li>
            <li>
              <Link
                href="/wishes/1/5"
                className="block rounded-lg px-4 py-2 text-blue-600 hover:bg-gray-100 hover:text-blue-800 transition-colors duration-200"
              >
                Другое
              </Link>
            </li>
          </ul>
        </div>
        <IsModalOpenProvider>
          <AddWishList />
          <ButtonExpandList />
        </IsModalOpenProvider>
      </GeneralLayout>
    </div>
  );
}
export default WishListPage;
