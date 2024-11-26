// import React, { createContext, useState, useContext } from "react";



// const ThemeContext = createContext(undefined);
// //@ts-ignore
// export const ThemeProvider = ({ children }) => {
//     const [changeBackground, setChangeBackground] = useState(false);

//     const toggleTheme = () => {
//         setChangeBackground((prevChange) => !prevChange);
//     };

//     return (
//         //@ts-ignore
//         <ThemeContext.Provider value={{ changeBackground, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };

// export const useTheme = () => {
//     const context = useContext(ThemeContext);
//     if (!context) {
//         throw new Error("Error");
//     }
//     return context;
// };
