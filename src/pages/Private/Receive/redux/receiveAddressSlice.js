import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";

const SINGLE_ADDRESS_STORE_NAME = 'SINGLE_ADDRESS_STORE_NAME';

const {
    initialState: getSingleAddressInitialState,
    thunk: getSingleAddress,
    reducers: getSingleAddressExtraReducers,
    stateNames: getSingleAddressStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getSingleAddress",
        storeName: SINGLE_ADDRESS_STORE_NAME,
        entityNameInStore: "singleAddress",
        thunkName: "/singleAddress/get",
        thunkUrl: (arg) => {
            return `/address-public-key/${arg}`
        },
        showToastOnFail: true
    }
);

const initialState = {
    ...getSingleAddressInitialState
}

const singleAddressSlice = createSlice({
    name: 'singleAddress',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getSingleAddressExtraReducers
    }
});

const singleAddressReducer = singleAddressSlice.reducer;
const resetState = singleAddressSlice.actions.resetState;

export {
    // store name
    SINGLE_ADDRESS_STORE_NAME,

    // actions
    getSingleAddress,

    //state names
    getSingleAddressStateNames,

    // reducer actions
    resetState,

    // main reducer
    singleAddressReducer
}
