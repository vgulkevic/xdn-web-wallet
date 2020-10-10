import {makeAsyncSliceActions} from "../../../../redux/utils/asyncSliceActionFactory";
import {getHttpClient} from "../../../../utils/axiosUtil";
import {createSlice} from "@reduxjs/toolkit";
import {createResetState} from "../../../../redux/utils/reducerFunctionsFactory";

const ENROLL_FOR_AIRDROP_STORE_NAME = "ENROLL_FOR_AIRDROP_STORE_NAME";

const {
    initialState: enrollForAirdropInitialStore,
    thunk: enrollForAirdrop,
    reducers: enrollForAirdropExtraReducers,
    stateNames: enrollForAirdropStateNames
} = makeAsyncSliceActions({
    actionName: 'enrollForAirdrop',
    thunkName: 'airdrop/enroll',
    storeName: ENROLL_FOR_AIRDROP_STORE_NAME,
    thunkAction: async (arg, thunkAPI) => {
        let res = await getHttpClient().put('/airdrop/enroll', arg.body);
        return res.data
    },
    showToastOnSuccess: true,
    showToastOnFail: true
});

const initialState = {
    ...enrollForAirdropInitialStore
}

const enrollForAirdropSlice = createSlice({
    name: 'enrollForAirdrop',
    initialState: initialState,
    reducers: {
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...enrollForAirdropExtraReducers
    }
});

const enrollForAirdropReducer = enrollForAirdropSlice.reducer;
const resetState = enrollForAirdropSlice.actions.resetState;

export {
    ENROLL_FOR_AIRDROP_STORE_NAME,

    enrollForAirdrop,

    enrollForAirdropStateNames,

    enrollForAirdropReducer,

    enrollForAirdropSlice,

    resetState
}
