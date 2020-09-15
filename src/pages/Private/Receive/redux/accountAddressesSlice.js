import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";
import {createCreateItemFromListSliceActionFactory} from "../../../../redux/utils/createItemInListSliceActionFactory";


const ACCOUNT_ADDRESSES_STORE_NAME = 'ACCOUNT_ADDRESSES_STORE_NAME';

const {
    initialState: getAccountAddressesInitialState,
    thunk: getAccountAddresses,
    reducers: getAccountAddressesExtraReducers,
    stateNames: getAccountAddressesStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getAccountAddresses",
        storeName: ACCOUNT_ADDRESSES_STORE_NAME,
        entityNameInStore: "accountAddresses",
        thunkName: "/accountAddresses/get",
        thunkUrl: (arg) => {
            return `/get-addresses-by-account`
        },
        showToastOnFail: true,
    }
);

const {
    initialState: createAccountAddressInitialState,
    thunk: createAccountAddress,
    reducers: createAccountAddressExtraReducers,
    stateNames: createAccountAddressStateNames
} = createCreateItemFromListSliceActionFactory(
    {
        actionName: 'createAccountAddress',
        storeName: ACCOUNT_ADDRESSES_STORE_NAME,
        entityNameInStore: 'accountAddresses',
        thunkName: "/accountAddresses/create",
        thunkUrl: (arg) => {
            return `/new-address-for-account`;
        },
        showToastOnSuccess: true,
        showToastOnFail: true
    }
);

const initialState = {
    ...getAccountAddressesInitialState,
    ...createAccountAddressInitialState
}

const accountAddressesSlice = createSlice({
    name: 'accountAddresses',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getAccountAddressesExtraReducers,
        ...createAccountAddressExtraReducers
    }
});

const accountAddressesReducer = accountAddressesSlice.reducer;
const resetState = accountAddressesSlice.actions.resetState;

export {
    // store name
    ACCOUNT_ADDRESSES_STORE_NAME,

    // actions
    getAccountAddresses,
    createAccountAddress,

    //state names
    getAccountAddressesStateNames,
    createAccountAddressStateNames,

    // reducer actions
    resetState,

    // main reducer
    accountAddressesReducer
}
