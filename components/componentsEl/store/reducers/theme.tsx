"use client"

interface Action {
        type: string;
}

interface ThemeState {
    darkMode:boolean;
}

const initialState: ThemeState = {          //Базовое состояние
    darkMode:false,
};

const themeReducer = (state = initialState, action:Action)=> {            //создание переменной для хранения состояния темы
    switch (action.type) {      //проверка состояния
        case "TOGGLE_THEME":
            return {
                ...state,
                darkMode: !state.darkMode  //Принимает состояние и меняет на дарк
            };
            default:
                return state;  //если не распознано
    }
};

export default themeReducer;