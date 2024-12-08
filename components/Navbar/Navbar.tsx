"use client";
import React from "react";
import Link from "next/link";
import "./Navbar.css";
import logo from "@/pictures/logo.jpg";
import Image from "next/image";
import circle from "@/pictures/circle.jpg";

function NavBar() {
  const navigationLists = [
    {
      id: 1,
      pageName: "Главная страница",
      href: "/",
      logoToPage: circle,
    },
    {
      id: 2,
      pageName: "Списки желаний",
      href: "/lists",
      logoToPage: circle,
    },
    {
      id: 3,
      pageName: "Настройки",
      href: "/lists/123",
      logoToPage: circle,
    },
    {
      id: 4,
      pageName: "Q&A",
      href: "/wishes",
      logoToPage: circle,
    },
  ];
  return (
    <nav>
      <div className="logotype-container">
        <Link href="/">
          <Image src={logo} alt="logotype" className="logotype-image" />
          <span className="logotype-title">WISHLIST</span>
        </Link>
      </div>
      {navigationLists.map((list) => (
        <span key={list.id} className="navTitle">
          <Image src={circle} alt="logoToPage" className="logo-page" />
          <ul>
            <li>
              <Link href={list.href}>{list.pageName}</Link>
            </li>
          </ul>
        </span>
      ))}
      <hr className="Separator" />
      <div className="emptySpace"></div>
    </nav>
  );
}
export default NavBar;
