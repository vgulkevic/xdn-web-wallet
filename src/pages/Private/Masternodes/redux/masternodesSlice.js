import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {makeAsyncSliceActions} from "../../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../../utils/axiosUtil";

const MASTERNODES_STORE_NAME = 'MASTERNODES_STORE_NAME';

const {
    initialState: getMasternodesInitialState,
    thunk: getMasternodes,
    reducers: getMasternodesExtraReducers,
    stateNames: getMasternodesStateNames
} = makeAsyncSliceActions({
        actionName: "getMasternodes",
        storeName: MASTERNODES_STORE_NAME,
        entityNameInStore: "masternodes",
        thunkName: "/masternodes/get",
        thunkAction: async (arg, thunkPI) => {
            let res = await getHttpClient().get('/masternodes');
            return res.data.data;
        },
        showToastOnFail: true,
    }
);

const initialState = {
    ...getMasternodesInitialState
}

const masternodesSlice = createSlice({
    name: 'masternodes',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...getMasternodesExtraReducers
    }
});

const masternodesReducer = masternodesSlice.reducer;
const resetState = masternodesSlice.actions.resetState;

export {
    // store name
    MASTERNODES_STORE_NAME,

    // actions
    getMasternodes,

    //state names
    getMasternodesStateNames,

    // reducer actions
    resetState,

    // main reducer
    masternodesReducer
}
