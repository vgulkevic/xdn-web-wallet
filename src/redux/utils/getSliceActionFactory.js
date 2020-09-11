import {createAsyncThunk} from "@reduxjs/toolkit";
import {geHttpClientWithApiKey} from "../../utils/axiosUtil";
import {notifierSlice} from "../../components/Notifier/notifierSlice";
import {LOCAL_DEVELOPMENT, PROFILE} from "../../profile";

export function createGetSliceActionFactory(params) {
    if (!params.actionName) {
        throw new Error("Provide unique name for this `get` slice");
    }

    if (!params.thunkName) {
        throw new Error("Provide unique name for this `get` async thunk");
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
        currentRequestId: params.actionName + "CurrentRequestId",
        error: params.actionName + "Error"
    }

    initialState[stateNames.entity] = null;
    initialState[stateNames.loaderIndicator] = false;
    initialState[stateNames.currentRequestId] = null;
    initialState[stateNames.error] = null;

    const getAsyncThunk = createAsyncThunk(
        params.thunkName,
        async (arg, thunkAPI) => {
            const store = thunkAPI.getState()[params.storeName];

            const loaderIndicator = store[stateNames.loaderIndicator];
            const currentRequestId = store[stateNames.currentRequestId];

            if (!loaderIndicator || thunkAPI.requestId !== currentRequestId) {
                return;
            }

            let getUrl = "";

            if (params.thunkUrl) {
                if (typeof params.thunkUrl === "function") {
                    getUrl = params.thunkUrl(arg);
                } else {
                    getUrl = params.thunkUrl;
                }
            }

            if (PROFILE === LOCAL_DEVELOPMENT && params.debugPromise) {
                const res = await params.debugPromise();
                return res.data;
            } else {
                const res = await geHttpClientWithApiKey(thunkAPI).get(getUrl);
                return res.data;
            }
        }
    );

    const extraReducers = {
        [getAsyncThunk.pending]: (state, action) => {
            if (!state[stateNames.loaderIndicator]) {
                state[stateNames.entity] = null;
                state[stateNames.loaderIndicator] = true;
                state[stateNames.currentRequestId] = action.meta.requestId;
                state[stateNames.error] = null;
            }
        },
        [getAsyncThunk.fulfilled]: (state, action) => {
            const {requestId} = action.meta;
            if (state[stateNames.loaderIndicator] && state[stateNames.currentRequestId] === requestId) {
                state[stateNames.entity] = action.payload;
                state[stateNames.loaderIndicator] = false;
                state[stateNames.currentRequestId] = null;
                state[stateNames.error] = null;

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
            }
        },
        [getAsyncThunk.rejected]: (state, action) => {
            const {requestId} = action.meta;
            if (state[stateNames.loaderIndicator] && state[stateNames.currentRequestId] === requestId) {
                state[stateNames.loaderIndicator] = false;
                state[stateNames.error] = action.payload || action.error.message;
                state[stateNames.currentRequestId] = null;

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
        thunk: getAsyncThunk,
        reducers: extraReducers,
        stateNames: stateNames
    }
}