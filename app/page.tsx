"use client"
import Link from 'next/link';
import WishListPage from './(dashboard)/wishes/page';




export default function Home() {
 
    return (
      <div className="App">
        <WishListPage/>
        <div>
        <Link href = "/lists/123/">Переход к спискам 123</Link>
        </div>
    <Link href = "/lists">Переход к общим спискам</Link>
      </div>
    );
  }
  

  

