import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";

const ADDRESSES_STORE_NAME = 'ADDRESSES_STORE_NAME';

const {
    initialState: getAddressesInitialState,
    thunk: getAddresses,
    reducers: getAddressesExtraReducers,
    stateNames: getAddressesStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getAddresses",
        storeName: ADDRESSES_STORE_NAME,
        entityNameInStore: "addresses",
        thunkName: "/addresses/get",
        thunkUrl: () => {
            return `/addresses`
        },
        showToastOnFail: true
    }
);

const initialState = {
    ...getAddressesInitialState
}

const addressesSlice = createSlice({
    name: 'addresses',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getAddressesExtraReducers
    }
});

const addressesReducer = addressesSlice.reducer;
const resetState = addressesSlice.actions.resetState;

export {
    // store name
    ADDRESSES_STORE_NAME,

    // actions
    getAddresses,

    //state names
    getAddressesStateNames,

    // reducer actions
    resetState,

    // main reducer
    addressesReducer
}
