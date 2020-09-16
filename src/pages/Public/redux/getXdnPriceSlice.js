import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../redux/utils/reducerFunctionsFactory";
import {makeAsyncSliceActions} from "../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../utils/axiosUtil";

const GET_XDN_PRICE_STORE_NAME = 'GET_XDN_PRICE_STORE_NAME';

const {
    initialState: getGetXdnPriceInitialState,
    thunk: getGetXdnPrice,
    reducers: getGetXdnPriceExtraReducers,
    stateNames: getGetXdnPriceStateNames
} = makeAsyncSliceActions(
    {
        actionName: "getGetXdnPrice",
        storeName: GET_XDN_PRICE_STORE_NAME,
        entityNameInStore: "getXdnPrice",
        thunkName: "/getXdnPrice/get",
        thunkAction: async (arg, thunkPI) => {
            let res = await getHttpClient().get('/xdn-price', {});
            return res.data;
        },
        showToastOnFail: true,
    }
);


const initialState = {
    ...getGetXdnPriceInitialState
}

const getXdnPriceSlice = createSlice({
    name: 'getXdnPrice',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getGetXdnPriceExtraReducers
    }
});

const getXdnPriceReducer = getXdnPriceSlice.reducer;
const resetState = getXdnPriceSlice.actions.resetState;

export {
    // store name
    GET_XDN_PRICE_STORE_NAME,

    // actions
    getGetXdnPrice,

    //state names
    getGetXdnPriceStateNames,

    // reducer actions
    resetState,

    // main reducer
    getXdnPriceReducer
}
