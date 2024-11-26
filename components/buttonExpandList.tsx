"use client"
import React, { useState } from "react"
import './addWishList.css'
import { useIsModalOpen } from "./buttonLink"

function ButtonExpandList () {
    const [expand,setExpand] = useState(false)
    const expanded = () => {
     setExpand(prevExpand => !prevExpand);
     console.log(expand)
    }
const {isModalOpenList, openModalList} = useIsModalOpen();    

return (
    <div>
        {!isModalOpenList && (
            <div>
        <button
        aria-expanded = {expand}
        aria-controls="formList"
        className="buttonExpandList"
        onClick={expanded}>Списки</button>
        {expand && (
        <div id="formList">
            <ul>
                <li>
                    
                    <button className="formListButton" onClick={openModalList}>Создать список:</button>
                    
                </li>
                <li>
                <button className="formListButton" >Редактировать список:</button>
                </li>
                <li>
                <button className="formListButton" >Удалить список:</button>
                </li>
            </ul>
        </div>
        )}
        </div>
    )};
    </div>
)

}
export default ButtonExpandList;