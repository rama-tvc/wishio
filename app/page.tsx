"use client"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WishListPage from "./(dashboard)/wishes/page";


export default function Home() {
 
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WishListPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  

  

