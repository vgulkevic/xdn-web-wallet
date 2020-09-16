import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";
import {createFetchSliceActionFactory} from "../../../../redux/utils/fetchSliceActionFactory";


const ACCOUNT_BALANCE_STORE_NAME = 'ACCOUNT_BALANCE_STORE_NAME';

const {
    initialState: getAccountBalanceInitialState,
    thunk: getAccountBalance,
    reducers: getAccountBalanceExtraReducers,
    stateNames: getAccountBalanceStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getAccountBalance",
        storeName: ACCOUNT_BALANCE_STORE_NAME,
        entityNameInStore: "accountBalance",
        thunkName: "/accountBalance/get",
        thunkUrl: (arg) => {
            return `/balance`
        },
        showToastOnFail: true,

        // for local development
        // debugPromise: () => new Promise((resolve, reject) => {
        //     window.setTimeout(function () {
        //         resolve(debugAccountBalance);
        //     }, 300);
        // })
    }
);

const {
    initialState: fetchAccountBalanceInitialState,
    thunk: fetchAccountBalance,
    reducers: fetchAccountBalanceExtraReducers,
    stateNames: fetchAccountBalanceStateNames
} = createFetchSliceActionFactory(
    {
        actionName: "fetchAccountBalance",
        storeName: ACCOUNT_BALANCE_STORE_NAME,
        entityNameInStore: "accountBalance",
        thunkName: "/accountBalance/fetch",
        thunkUrl: (arg) => {
            return `/balance`
        },
    }
);

const initialState = {
    ...getAccountBalanceInitialState,
    ...fetchAccountBalanceInitialState
}

const accountBalanceSlice = createSlice({
    name: 'accountBalance',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getAccountBalanceExtraReducers,
        ...fetchAccountBalanceExtraReducers
    }
});

const accountBalanceReducer = accountBalanceSlice.reducer;
const resetState = accountBalanceSlice.actions.resetState;

export {
    // store name
    ACCOUNT_BALANCE_STORE_NAME,

    // actions
    getAccountBalance,
    fetchAccountBalance,

    //state names
    getAccountBalanceStateNames,
    fetchAccountBalanceStateNames,

    // reducer actions
    resetState,

    // main reducer
    accountBalanceReducer
}
