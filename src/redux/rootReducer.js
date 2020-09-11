import {combineReducers} from "redux";
import {NOTIFIER_STORE_NAME, notifierReducer} from "../components/Notifier/notifierSlice";
import {NAVIGATION_MENU_STORE_NAME, navigationMenuReducer} from "../components/SidebarMenu/redux/navigationMenuSlice";

const reducerList = {
    [NOTIFIER_STORE_NAME]: notifierReducer,
    [NAVIGATION_MENU_STORE_NAME]: navigationMenuReducer
}

const rootReducer = combineReducers(reducerList);
export default rootReducer;
