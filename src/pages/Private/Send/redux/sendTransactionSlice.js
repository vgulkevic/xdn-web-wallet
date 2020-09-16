import {makeAsyncSliceActions} from "../../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../../utils/axiosUtil";
import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";

const SEND_TRANSACTION_STORE_NAME = "SEND_TRANSACTION_STORE_NAME";

const {
    initialState: sendTransactionInitialStore,
    thunk: sendTransaction,
    reducers: sendTransactionExtraReducers,
    stateNames: sendTransactionStateNames
} = makeAsyncSliceActions({
    actionName: 'sendTransaction',
    thunkName: 'transaction/new',
    storeName: SEND_TRANSACTION_STORE_NAME,
    thunkAction: async (arg, thunkAPI) => {
        let res = await getHttpClient().post('/send-transaction', arg.body);
        return res.data
    },
    showToastOnSuccess: true,
    showToastOnFail: true
});

const initialState = {
    ...sendTransactionInitialStore
}

const sendTransactionSlice = createSlice({
    name: 'sendTransaction',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...sendTransactionExtraReducers
    }
});

const sendTransactionReducer = sendTransactionSlice.reducer;
const resetState = sendTransactionSlice.actions.resetState;

export {
    SEND_TRANSACTION_STORE_NAME,

    sendTransaction,

    sendTransactionStateNames,

    sendTransactionReducer,

    sendTransactionSlice,

    resetState
}
