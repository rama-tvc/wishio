"use client"
export const loadState = () => {                //Загружать состояние в кэш
    try {
const serializedState = localStorage.getItem("state");
if (serializedState === null) {
    return undefined;
}    
return JSON.parse(serializedState);
} catch(e) {
        console.log(e);
    }
};

export const saveState = (state:object):void => {           //Сохранять состояние в кэш
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("state", serializedState);
    }
    catch(e) {
        console.log(e);
    }
};