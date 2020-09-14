import {createSlice} from "@reduxjs/toolkit";
import {makeAsyncSliceActions} from "./utils/asyncSliceActionFactory";
import {createResetState} from "./utils/reducerFunctionsFactory";
import {getHttpClient} from "../utils/axiosUtil";

const USER_SESSION_STORE_NAME = "USER_SESSION_STORE_NAME";

const {
    initialState: userSessionInitialStore,
    thunk: authenticateUser,
    reducers: authenticateUserExtraReducers,
    stateNames: authenticateUserStateNames
} = makeAsyncSliceActions({
    actionName: 'authenticateUser',
    thunkName: 'user/auth',
    storeName: USER_SESSION_STORE_NAME,
    thunkAction: async (arg, thunkAPI) => {
        let user = JSON.parse(window.localStorage.getItem('user'));

        if (user && user.token) {
            let res = await getHttpClient(thunkAPI).post(`/auth`, {}, {headers: {'x-token': user.token}});
            return res.data;
        } else {
            return {
                session: false
            };
        }
    },
    onFulfilledFunc: (state, action, stateNames) => {
        if (action.payload && action.payload.session) {
            let user = JSON.parse(window.localStorage.getItem('user'));

            return {
                token: user.token
            }
        } else {
            window.localStorage.removeItem('user');
            return {};
        }
    },
    entityNameInStore: 'userSession',
    showToastOnSuccess: false,
    showToastOnFail: true
});

const initialState = {
    ...userSessionInitialStore
};

const userSessionSlice = createSlice({
    name: 'userSessionSlice',
    initialState: initialState,
    reducers: {
        setSession: (state, action) => {
            state[authenticateUserStateNames.entity] = {
                token: action.payload.token
            }
        },
        resetState: (state, action) => createResetState(state, action, initialState)
    },
    extraReducers: {
        ...authenticateUserExtraReducers
    }
});

const userSessionReducer = userSessionSlice.reducer;
const setSession = userSessionSlice.actions.setSession;
const resetState = userSessionSlice.actions.resetState;

export {
    USER_SESSION_STORE_NAME,

    authenticateUser,

    authenticateUserStateNames,

    userSessionReducer,

    userSessionSlice,
    // actions
    resetState,
    setSession
}
