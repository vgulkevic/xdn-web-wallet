import {makeAsyncSliceActions} from "../../../redux/utils/asyncSliceActionFactory";
import {createResetState} from "../../../redux/utils/reducerFunctionsFactory";
import {getHttpClient} from "../../../utils/axiosUtil";
import {createSlice} from "@reduxjs/toolkit";

const CREATE_NEW_WALLET_STORE_NAME = "CREATE_NEW_WALLET_STORE_NAME";

const {
    initialState: createNewWalletInitialState,
    thunk: createNewWallet,
    reducers: createNewWalletExtraReducers,
    stateNames: createNewWalletStateNames
} = makeAsyncSliceActions({
    actionName: 'createNewWallet',
    thunkName: 'wallet/new',
    storeName: CREATE_NEW_WALLET_STORE_NAME,
    thunkAction: async (arg, thunkPI) => {
        let res = await getHttpClient().post('/new-address', {});
        return res.data;
    }
});

const initialState = {
    ...createNewWalletInitialState
};

const newWalletSlice = createSlice({
    name: 'createNewWalletSlice',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...createNewWalletExtraReducers
    }
});

const createNewWalletReducer = newWalletSlice.reducer;
const resetState = newWalletSlice.actions.resetState;

export {
    CREATE_NEW_WALLET_STORE_NAME,

    createNewWallet,

    createNewWalletStateNames,

    createNewWalletReducer,

    newWalletSlice,

    resetState
}
