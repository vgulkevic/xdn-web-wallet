import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";


const ACCOUNT_TRANSACTIONS_STORE_NAME = 'ACCOUNT_TRANSACTIONS_STORE_NAME';

const {
    initialState: getAccountTransactionsInitialState,
    thunk: getAccountTransactions,
    reducers: getAccountTransactionsExtraReducers,
    stateNames: getAccountTransactionsStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getAccountTransactions",
        storeName: ACCOUNT_TRANSACTIONS_STORE_NAME,
        entityNameInStore: "accountTransactions",
        thunkName: "/accountTransactions/list/get",
        thunkUrl: (arg) => {
            let url = `/transactions?`;
            if (arg.count) {
                url = url + `count=${arg.count}`
            }
            if (arg.skip) {
                url = url + `skip=${arg.skip}`
            }

            return url;
        },
        showToastOnFail: true
    }
);

const initialState = {
    ...getAccountTransactionsInitialState
}

const accountTransactionsSlice = createSlice({
    name: 'accountTransactions',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getAccountTransactionsExtraReducers
    }
});

const accountTransactionsReducer = accountTransactionsSlice.reducer;
const resetState = accountTransactionsSlice.actions.resetState;

export {
    // store name
    ACCOUNT_TRANSACTIONS_STORE_NAME,

    // actions
    getAccountTransactions,

    //state names
    getAccountTransactionsStateNames,

    // reducer actions
    resetState,

    // main reducer
    accountTransactionsReducer
}
