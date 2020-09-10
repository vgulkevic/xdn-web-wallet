import {combineReducers} from "redux";
import {notifierReducer} from "../components/Notifier/notifierSlice";

const reducerList = {
    notifications: notifierReducer
}

const rootReducer = combineReducers(reducerList);
export default rootReducer;
