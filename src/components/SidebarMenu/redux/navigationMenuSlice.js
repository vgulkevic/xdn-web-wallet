import {createSlice} from "@reduxjs/toolkit";

const NAVIGATION_MENU_STORE_NAME = "NAVIGATION_MENU_STORE_NAME";

const initialState = {
    currentMenuItem: null
};

const navigationMenuSlice = createSlice({
    name: 'navigationMenuSlice',
    initialState: initialState,
    reducers: {
        setCurrentMenuItem: (state, action) => {
            state.currentMenuItem = action.payload;
        },
        reset: () => {
            return initialState;
        }
    },
});

const navigationMenuReducer = navigationMenuSlice.reducer;
const setCurrentMenuItem = navigationMenuSlice.actions.setCurrentMenuItem;
const resetCurrentMenuItem = navigationMenuSlice.actions.reset;

export {
    NAVIGATION_MENU_STORE_NAME,
    navigationMenuReducer,
    navigationMenuSlice,
    // actions
    setCurrentMenuItem,
    resetCurrentMenuItem
}
