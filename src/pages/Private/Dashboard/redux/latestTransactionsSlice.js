import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";


const LATEST_TRANSACTIONS_STORE_NAME = 'LATEST_TRANSACTIONS_STORE_NAME';

const {
    initialState: getLatestTransactionsInitialState,
    thunk: getLatestTransactions,
    reducers: getLatestTransactionsExtraReducers,
    stateNames: getLatestTransactionsStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getLatestTransactions",
        storeName: LATEST_TRANSACTIONS_STORE_NAME,
        entityNameInStore: "latestTransactions",
        thunkName: "/latestTransactions/get",
        thunkUrl: (arg) => {
            return `/latest-transactions`
        },
        showToastOnFail: true,

        // for local development
        // debugPromise: () => new Promise((resolve, reject) => {
        //     window.setTimeout(function () {
        //         resolve(debugLatestTransactions);
        //     }, 300);
        // })
    }
);

const initialState = {
    ...getLatestTransactionsInitialState
}

const latestTransactionsSlice = createSlice({
    name: 'latestTransactions',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getLatestTransactionsExtraReducers
    }
});

const latestTransactionsReducer = latestTransactionsSlice.reducer;
const resetState = latestTransactionsSlice.actions.resetState;

export {
    // store name
    LATEST_TRANSACTIONS_STORE_NAME,

    // actions
    getLatestTransactions,

    //state names
    getLatestTransactionsStateNames,

    // reducer actions
    resetState,

    // main reducer
    latestTransactionsReducer
}
