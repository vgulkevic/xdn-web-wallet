import {combineReducers} from "redux";
import {NOTIFIER_STORE_NAME, notifierReducer} from "../components/Notifier/notifierSlice";
import {NAVIGATION_MENU_STORE_NAME, navigationMenuReducer} from "../components/SidebarMenu/redux/navigationMenuSlice";
import {ADDRESSES_STORE_NAME, addressesReducer} from "../pages/Private/Addresses/redux/addressesSlice";
import {MASTERNODES_STORE_NAME, masternodesReducer} from "../pages/Private/Masternodes/redux/masternodesSlice";

const reducerList = {
    [NOTIFIER_STORE_NAME]: notifierReducer,
    [NAVIGATION_MENU_STORE_NAME]: navigationMenuReducer,
    [ADDRESSES_STORE_NAME]: addressesReducer,
    [MASTERNODES_STORE_NAME]: masternodesReducer
}

const rootReducer = combineReducers(reducerList);
export default rootReducer;
