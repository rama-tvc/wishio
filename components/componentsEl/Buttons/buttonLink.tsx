"use client"

import React, { createContext, useState, ReactNode, useContext } from "react";

interface IsModalOpenContextType {
    isModalOpenList:boolean;
    isModalOpenWish: boolean;
    openModalList:()=>void;
    closeModalList:()=>void;
    openModalWish: ()=>void;
    closeModalWish: ()=>void;
}

const IsModalOpenContext = createContext<IsModalOpenContextType| undefined>(undefined);

interface IsModalOpenProviderProps {
    children:ReactNode;
}
export function IsModalOpenProvider ({children}: IsModalOpenProviderProps) {
    const [isModalOpenList, setIsModalOpenList] = useState(false);
    const [isModalOpenWish, setIsModalOpenWish] = useState(false);
    const openModalList = () => {
        setIsModalOpenList(true);
    }
    const closeModalList = () => {
        setIsModalOpenList(false);
    };
    const openModalWish = () => {
        setIsModalOpenWish(true);
    }
    const closeModalWish = () => {
        setIsModalOpenWish(false);
    } 
    return (
        <IsModalOpenContext.Provider value = {{isModalOpenList,isModalOpenWish,openModalList,closeModalList, openModalWish,closeModalWish}}>
            {children}
        </IsModalOpenContext.Provider>
    );

    }
    export function useIsModalOpen () {
        const context = useContext(IsModalOpenContext);
        if(!context) {
            throw new Error("useIsModalOpen is not working");
        }
        return context;
}