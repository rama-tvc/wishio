"use client";
import GeneralLayout from "@/components/componentsEl/Mainpage/ReduxMainpage";
import Link from "next/link";

function WishListPage() {
  return (
    <div>
      <GeneralLayout>
        <label htmlFor="lists">Выберите список:</label>
        <ul>
          <li>
            <Link href="/wishes/1/1">Для друзей</Link>
          </li>
          <li>
            <Link href="/wishes/1/2">Для родственников</Link>
          </li>
        </ul>
      </GeneralLayout>
    </div>
  );
}
export default WishListPage;
