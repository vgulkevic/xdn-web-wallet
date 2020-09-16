import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";

const WALLET_INFO_STORE_NAME = 'WALLET_INFO_STORE_NAME';

const {
    initialState: getWalletInfoInitialState,
    thunk: getWalletInfo,
    reducers: getWalletInfoExtraReducers,
    stateNames: getWalletInfoStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getWalletInfo",
        storeName: WALLET_INFO_STORE_NAME,
        entityNameInStore: "walletInfo",
        thunkName: "/walletInfo/get",
        thunkUrl: (arg) => {
            return `/info`
        },
        showToastOnFail: true,

    }
);

const initialState = {
    ...getWalletInfoInitialState
}

const walletInfoSlice = createSlice({
    name: 'walletInfo',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getWalletInfoExtraReducers
    }
});

const walletInfoReducer = walletInfoSlice.reducer;
const resetState = walletInfoSlice.actions.resetState;

export {
    // store name
    WALLET_INFO_STORE_NAME,

    // actions
    getWalletInfo,

    //state names
    getWalletInfoStateNames,

    // reducer actions
    resetState,

    // main reducer
    walletInfoReducer
}
