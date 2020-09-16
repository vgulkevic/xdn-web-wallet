import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../redux/utils/reducerFunctionsFactory";
import {makeAsyncSliceActions} from "../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../utils/axiosUtil";

const GET_BTC_USD_PRICE_STORE_NAME = 'GET_BTC_USD_PRICE_STORE_NAME';

const {
    initialState: getGetBtcUsdPriceInitialState,
    thunk: getGetBtcUsdPrice,
    reducers: getGetBtcUsdPriceExtraReducers,
    stateNames: getGetBtcUsdPriceStateNames
} = makeAsyncSliceActions(
    {
        actionName: "getGetBtcUsdPrice",
        storeName: GET_BTC_USD_PRICE_STORE_NAME,
        entityNameInStore: "getBtcUsdPrice",
        thunkName: "/getBtcUsdPrice/get",
        thunkAction: async (arg, thunkPI) => {
            let res = await getHttpClient().get('/btc-price', {});
            return res.data;
        },
        showToastOnFail: true,
    }
);


const initialState = {
    ...getGetBtcUsdPriceInitialState
}

const getBtcUsdPriceSlice = createSlice({
    name: 'getBtcUsdPrice',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getGetBtcUsdPriceExtraReducers
    }
});

const getBtcUsdPriceReducer = getBtcUsdPriceSlice.reducer;
const resetState = getBtcUsdPriceSlice.actions.resetState;

export {
    // store name
    GET_BTC_USD_PRICE_STORE_NAME,

    // actions
    getGetBtcUsdPrice,

    //state names
    getGetBtcUsdPriceStateNames,

    // reducer actions
    resetState,

    // main reducer
    getBtcUsdPriceReducer
}
