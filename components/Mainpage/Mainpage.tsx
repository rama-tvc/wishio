"use client";

import Navbar from "@/components/Navbar/Navbar";
import "./Mainpage.css";
import Header from "../Header/Header";
import { useSelector } from "react-redux";
import {RootState} from "@/components/store/store"


const MainPage = ({ children }: { children: React.ReactNode }) => {
    const theme = useSelector((state: RootState) => state.theme);
  
    return (
      <div className={`dashboard-layout${theme.darkMode ? "-is-dark" : ""}`}>

        <Navbar />
        <div className="pageBody">
          <div className="pageHeader">
            <Header />
          </div>
          <div className="pageContent">{children}</div>
        </div>
      </div>
    );
  };
  
  
export default MainPage;
