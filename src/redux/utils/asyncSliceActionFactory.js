import {createAsyncThunk} from "@reduxjs/toolkit";
import {notifierSlice} from "../../components/Notifier/notifierSlice";

/**
 * @param thunkAction {function(Object, ThunkAPI)} - Async action to execute in thunk
 * @param onFulfilled {function(state, action)} - Optional function that modifies state
 * */
export function makeAsyncSliceActions({
                                          actionName,
                                          thunkName,
                                          storeName,
                                          thunkAction,
                                          onFulfilledFunc,
                                          entityNameInStore,
                                          showToastOnSuccess,
                                          showToastOnFail
}) {
    if (!actionName) {
        throw new Error("Provide unique name for this slice");
    }

    if (!thunkName) {
        throw new Error("Provide unique name for this async thunk");
    }

    if (!storeName) {
        throw new Error("Provide store name");
    }

    if(!thunkAction){
        throw new Error("Provide thunk action")
    }
    
    const stateNames = {
        entity: entityNameInStore,
        loading: actionName + "Loading",
        currentRequestId: actionName + "CurrentRequestId",
        actionCompleted: actionName + "Completed",
        error: actionName + "Error",
    }

    const initialState = {
        [stateNames.entity]: null,
        [stateNames.loading]: false,
        [stateNames.currentRequestId]: null,
        [stateNames.actionCompleted]: false,
        [stateNames.error]: null
    }

    const asyncThunk = createAsyncThunk(
        thunkName,
        async (arg, thunkAPI) => {
            const store = thunkAPI.getState()[storeName];

            const loaderIndicator = store[stateNames.loading];
            const currentRequestId = store[stateNames.currentRequestId];

            if (!loaderIndicator || thunkAPI.requestId !== currentRequestId) {
                return;
            }

            return await thunkAction(arg, thunkAPI);
        }
    );

    const extraReducers = {
        [asyncThunk.pending]: (state, action) => {
            if (!state[stateNames.loading]) {
                state[stateNames.loading] = true;
                state[stateNames.currentRequestId] = action.meta.requestId;
                state[stateNames.error] = null;
            }
        },
        [asyncThunk.fulfilled]: (state, action) => {
            const {requestId} = action.meta;
            if (state[stateNames.loading] && state[stateNames.currentRequestId] === requestId) {
                state[stateNames.loading] = false;
                state[stateNames.currentRequestId] = null;
                state[stateNames.error] = null;

                state[stateNames.entity] = onFulfilledFunc ? onFulfilledFunc(state, action, stateNames) : action.payload;

                state[stateNames.actionCompleted] = true;
                if (showToastOnSuccess) {
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
        [asyncThunk.rejected]: (state, action) => {
            const {requestId} = action.meta;
            if (state[stateNames.loading] && state[stateNames.currentRequestId] === requestId) {
                state[stateNames.loading] = false;
                state[stateNames.error] = action.payload || action.error.message;
                state[stateNames.currentRequestId] = null;

                if (showToastOnFail) {
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
        thunk: asyncThunk,
        reducers: extraReducers,
        stateNames: stateNames
    }
}