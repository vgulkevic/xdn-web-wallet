import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";
import {createGetSliceActionFactory} from "../../../../redux/utils/getSliceActionFactory";
import {debugMasternodes} from "./debugMasternodes";

const MASTERNODES_STORE_NAME = 'MASTERNODES_STORE_NAME';

const {
    initialState: getMasternodesInitialState,
    thunk: getMasternodes,
    reducers: getMasternodesExtraReducers,
    stateNames: getMasternodesStateNames
} = createGetSliceActionFactory(
    {
        actionName: "getMasternodes",
        storeName: MASTERNODES_STORE_NAME,
        entityNameInStore: "masternodes",
        thunkName: "/masternodes/get",
        thunkUrl: (arg) => {
            return `/${arg}/masternodes`
        },
        showToastOnFail: true,

        // for local development
        debugPromise: () => new Promise((resolve, reject) => {
            window.setTimeout(function () {
                resolve(debugMasternodes);
            }, 300);
        })
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
