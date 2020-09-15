import {createAsyncThunk} from "@reduxjs/toolkit";
import {geHttpClientWithApiKey, getEventHttpClient} from "../../utils/axiosUtil";
import {notifierSlice} from "../../components/Notifier/notifierSlice";

export function createCreateItemFromListSliceActionFactory(params) {
    if (!params.actionName) {
        throw new Error("Provide unique name for this `create` slice");
    }

    if (!params.thunkName) {
        throw new Error("Provide unique name for this `update` async thunk");
    }

    if (!params.storeName) {
        throw new Error("Provide store name");
    }

    if (!params.thunkUrl) {
        throw new Error("Provide thunk url");
    }

    const initialState = {}

    const stateNames = {
        entity: params.entityNameInStore,
        loaderIndicator: params.actionName + "Loading",
        actionCompletedIndicator: params.actionName + "Completed",
        currentRequestId: params.actionName + "CurrentRequestId",
        error: params.actionName + "Error"
    }

    initialState[stateNames.entity] = null;
    initialState[stateNames.loaderIndicator] = {};
    initialState[stateNames.actionCompletedIndicator] = {};
    initialState[stateNames.currentRequestId] = {};
    initialState[stateNames.error] = null;

    const createItemInListAsyncThunk = createAsyncThunk(
        params.thunkName,
        async (arg, thunkAPI) => {
            const store = thunkAPI.getState()[params.storeName];

            const loaderIndicator = store[stateNames.loaderIndicator][arg.id];
            const currentRequestId = store[stateNames.currentRequestId][arg.id];

            if (!loaderIndicator || thunkAPI.requestId !== currentRequestId) {
                return;
            }

            let url = "";

            if (params.thunkUrl) {
                if (typeof params.thunkUrl === "function") {
                    url = params.thunkUrl(arg);
                } else {
                    url = params.thunkUrl;
                }
            }
            const res = await geHttpClientWithApiKey(thunkAPI).post(url, arg.body)
            return res.data
        }
    );


    const extraReducers = {
        [createItemInListAsyncThunk.pending]: (state, action) => {
            if (!state[stateNames.loaderIndicator][action.meta.arg.id]) {
                state[stateNames.loaderIndicator][action.meta.arg.id] = true;
                state[stateNames.currentRequestId][action.meta.arg.id] = action.meta.requestId;
                state[stateNames.error] = null;
            }
        },
        [createItemInListAsyncThunk.fulfilled]: (state, action) => {
            const {requestId} = action.meta;
            if (state[stateNames.loaderIndicator][action.meta.arg.id] && state[stateNames.currentRequestId][action.meta.arg.id] === requestId) {

                if (state[stateNames.entity]) {
                    if (Array.isArray(action.payload)) {
                            state[stateNames.entity] = [...state[stateNames.entity], ...action.payload];

                    } else {
                        state[stateNames.entity] = [...state[stateNames.entity], action.payload];
                    }
                }

                if (params.showToastOnSuccess) {
                    action.asyncDispatch(notifierSlice.actions.enqueueSnackbar(
                        {
                            message: "Success",
                            options: {
                                variant: 'success'
                            }
                        }
                    ));
                }

                state[stateNames.loaderIndicator][action.meta.arg.id] = false;
                state[stateNames.actionCompletedIndicator][action.meta.arg.id] = true;
                state[stateNames.currentRequestId][action.meta.arg.id] = null;
                state[stateNames.error] = null;
            }
        },
        [createItemInListAsyncThunk.rejected]: (state, action) => {
            const {requestId} = action.meta;
            if (state[stateNames.loaderIndicator][action.meta.arg.id] && state[stateNames.currentRequestId][action.meta.arg.id] === requestId) {
                state[stateNames.loaderIndicator][action.meta.arg.id] = false;
                state[stateNames.error] = action.payload || action.error.message;
                state[stateNames.currentRequestId][action.meta.arg.id] = null;

                if (params.showToastOnFail) {
                    action.asyncDispatch(notifierSlice.actions.enqueueSnackbar(
                        {
                            message: state[stateNames.error],
                            options: {
                                variant: 'error'
                            }
                        }
                    ));
                }
            }
        }
    }

    return {
        initialState: initialState,
        thunk: createItemInListAsyncThunk,
        reducers: extraReducers,
        stateNames: stateNames
    }
}