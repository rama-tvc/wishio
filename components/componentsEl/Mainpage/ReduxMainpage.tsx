import { Provider } from "react-redux";
import { store } from "../store/store";
import MainPage from "./Mainpage";

function GeneralLayout ({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
       <MainPage>
        {children}
       </MainPage>
       </Provider>
    )
}
export default GeneralLayout;