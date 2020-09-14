import {createSlice} from "@reduxjs/toolkit";

const NAVIGATION_MENU_STORE_NAME = "NAVIGATION_MENU_STORE_NAME";

const initialState = {
    currentMenuItem: null,
    sidebarOpen: false,
    initialised: false
};

const navigationMenuSlice = createSlice({
    name: 'navigationMenuSlice',
    initialState: initialState,
    reducers: {
        initialise: (state, action) => {
            state.sidebarOpen = action.payload;
            state.initialised = true;
            return state;
        },
        setCurrentMenuItem: (state, action) => {
            state.currentMenuItem = action.payload;
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        reset: () => {
            return initialState;
        }
    },
});

const navigationMenuReducer = navigationMenuSlice.reducer;
const initialiseSidebar = navigationMenuSlice.actions.initialise;
const setCurrentMenuItem = navigationMenuSlice.actions.setCurrentMenuItem;
const setSidebarOpen = navigationMenuSlice.actions.setSidebarOpen;
const resetCurrentMenuItem = navigationMenuSlice.actions.reset;

export {
    NAVIGATION_MENU_STORE_NAME,
    navigationMenuReducer,
    navigationMenuSlice,
    // actions
    initialiseSidebar,
    setCurrentMenuItem,
    setSidebarOpen,
    resetCurrentMenuItem
}
