import {makeAsyncSliceActions} from "../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../utils/axiosUtil";
import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../redux/utils/reducerFunctionsFactory";

const IMPORT_NEW_ADDRESS_STORE_NAME = "IMPORT_NEW_ADDRESS_STORE_NAME";

const {
    initialState: importNewAddressInitialStore,
    thunk: importNewAddress,
    reducers: importNewAddressExtraReducers,
    stateNames: importNewAddressStateNames
} = makeAsyncSliceActions({
    actionName: 'importNewAddress',
    thunkName: 'wallet/import',
    storeName: IMPORT_NEW_ADDRESS_STORE_NAME,
    thunkAction: async (arg, thunkAPI) => {
        let res = await getHttpClient().post('/import-address', arg.body);
        return res.data
    }
});

const initialState = {
    ...importNewAddressInitialStore
}

const importAddressSlice = createSlice({
    name: 'importAddress',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...importNewAddressExtraReducers
    }
});

const importAddressReducer = importAddressSlice.reducer;
const resetState = importAddressSlice.actions.resetState;

export {
    IMPORT_NEW_ADDRESS_STORE_NAME,

    importNewAddress,

    importNewAddressStateNames,

    importAddressReducer,

    importAddressSlice,

    resetState
}
