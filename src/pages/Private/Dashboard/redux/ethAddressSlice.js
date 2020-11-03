import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";
import {makeAsyncSliceActions} from "../../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../../utils/axiosUtil";

const ACCOUNT_ETH_ADDRESS_STORE_NAME = 'ACCOUNT_ETH_ADDRESS_STORE_NAME';

const {
    initialState: getEthAddressInitialState,
    thunk: getEthAddress,
    reducers: getEthAddressExtraReducers,
    stateNames: getEthAddressStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getEthAddress",
        storeName: ACCOUNT_ETH_ADDRESS_STORE_NAME,
        entityNameInStore: "ethAddress",
        thunkName: "/ethAddress/get",
        thunkUrl: (arg) => {
            return `/eth-address`
        },
        showToastOnFail: true,
    }
);

const {
    initialState: saveEthAddressInitialState,
    thunk: saveEthAddress,
    reducers: saveEthAddressExtraReducers,
    stateNames: saveEthAddressStateNames
} = makeAsyncSliceActions(
    {
        actionName: "saveEthAddress",
        storeName: ACCOUNT_ETH_ADDRESS_STORE_NAME,
        entityNameInStore: "ethAddress",
        thunkName: "/ethAddress/save",
        thunkAction: async (payload, thunkAPI) => {
            await getHttpClient().post("/eth-address", {
                ethAddress: payload
            });
            return payload;
        },
        showToastOnFail: true,
        showToastOnSuccess: true
    }
);

const initialState = {
    ...getEthAddressInitialState,
    ...saveEthAddressInitialState
}

const ethAddressSlice = createSlice({
    name: 'ethAddress',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getEthAddressExtraReducers,
        ...saveEthAddressExtraReducers
    }
});

const ethAddressReducer = ethAddressSlice.reducer;
const resetState = ethAddressSlice.actions.resetState;

export {
    // store name
    ACCOUNT_ETH_ADDRESS_STORE_NAME,

    // actions
    getEthAddress,
    saveEthAddress,

    //state names
    getEthAddressStateNames,
    saveEthAddressStateNames,

    // reducer actions
    resetState,

    // main reducer
    ethAddressReducer
}
