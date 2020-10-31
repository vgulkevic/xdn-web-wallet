import {Auth} from "@aws-amplify/auth";
import {createSlice} from "@reduxjs/toolkit";
import {makeAsyncSliceActions} from "../../../redux/utils/asyncSliceActionFactory";
import {createResetState} from "../../../redux/utils/reducerFunctionsFactory";
import {getHttpClient} from "../../../utils/axiosUtil";

const AUTH_STORE_NAME = "AUTH_STORE_NAME"
const incompleteUserStateName = 'incompleteUser'

const {
    initialState: signInInitialState,
    thunk: signIn,
    reducers: signInExtraReducers,
    stateNames: signInStateNames
} = makeAsyncSliceActions(
    {
        actionName: "signIn",
        storeName: AUTH_STORE_NAME,
        entityNameInStore: "user",
        thunkName: "/auth/login",
        thunkAction: async ({username, password}, thunkAPI) => {
            const user = await Auth.signIn(username, password);
            console.log(user);
            return user
        },
        onFulfilledFunc: (state, action, stateNames) => {
            const user = action.payload
            console.log("onFulfilledFunc");
            console.log(user);
            if(user.challengeName) {
                state[incompleteUserStateName] = user
            } else {
                action.asyncDispatch(getAuth());
                return user
            }
        },
        showToastOnFail: true
    }
);

const {
    initialState: getAuthInitialState,
    thunk: getAuth,
    reducers: getAuthExtraReducers,
    stateNames: getAuthStateNames
} = makeAsyncSliceActions(
    {
        actionName: "getAuth",
        storeName: AUTH_STORE_NAME,
        entityNameInStore: "user",
        thunkName: "/auth/get",
        thunkAction: async (arg, thunkAPI) => {
            const res = await Auth.currentAuthenticatedUser();
            return res
        },
        showToastOnSuccess: false,
        showToastOnFail: false
    }
);

const {
    initialState: completePasswordInitialState,
    thunk: completePassword,
    reducers: completePasswordExtraReducers,
    stateNames: completePasswordStateNames
} = makeAsyncSliceActions({
    actionName: "completePassword",
    storeName: AUTH_STORE_NAME,
    entityNameInStore: "user",
    thunkName: "/auth/completePassword",
    thunkAction: async ({password}, thunkAPI) => {
        const user = thunkAPI.getState()[AUTH_STORE_NAME].incompleteUser
        const res = await Auth.completeNewPassword(user, password);
        return res
    },
    showToastOnFail: true
})

const forgotPasswordStateName = "forgotPassword"
const {
    initialState: forgotPasswordInitialState,
    thunk: forgotPassword,
    reducers: forgotPasswordExtraReducers,
    stateNames: forgotPasswordStateNames
} = makeAsyncSliceActions({
    actionName: "forgotPassword",
    storeName: AUTH_STORE_NAME,
    entityNameInStore: forgotPasswordStateName,
    thunkName: "/auth/forgotPassword",
    thunkAction: async ({email}, thunkAPI) => {
        const res = await Auth.forgotPassword(email);
        return {email, delivery: res['CodeDeliveryDetails']['DeliveryMedium']}
    },
    showToastOnFail: true
})

const forgotPasswordCompleteStateName = "forgotPasswordComplete"
const {
    initialState: forgotPasswordCompleteInitialState,
    thunk: forgotPasswordComplete,
    reducers: forgotPasswordCompleteExtraReducers,
    stateNames: forgotPasswordCompleteStateNames
} = makeAsyncSliceActions({
    actionName: "forgotPasswordComplete",
    storeName: AUTH_STORE_NAME,
    entityNameInStore: forgotPasswordCompleteStateName,
    thunkName: "/auth/forgotPasswordCompleteComplete",
    thunkAction: async ({email, code, password}, thunkAPI) => {
        await Auth.forgotPasswordSubmit(email, code, password);
    },
    showToastOnFail: true,
    showToastOnSuccess: true
})

const {
    initialState: signUpInitialState,
    thunk: signUp,
    reducers: signUpExtraReducers,
    stateNames: signUpStateNames
} = makeAsyncSliceActions(
    {
        actionName: "signUp",
        storeName: AUTH_STORE_NAME,
        entityNameInStore: "user",
        thunkName: "/auth/signup",
        thunkAction: async ({username, password}, thunkAPI) => {
            await getHttpClient().post("/sign-up", {
                username: username,
                password: password
            });
            return {username: username, password: password};
        },
        onFulfilledFunc: (state, action, stateNames) => {
            state[signUpCodeStateNames.entity] = action.payload;
            return null;
        },
        showToastOnSuccess: true,
        showToastOnFail: true
    }
);

const {
    initialState: signUpCodeInitialState,
    thunk: signUpCode,
    reducers: signUpCodeExtraReducers,
    stateNames: signUpCodeStateNames
} = makeAsyncSliceActions(
    {
        actionName: "signUpCode",
        storeName: AUTH_STORE_NAME,
        entityNameInStore: "signUpCode",
        thunkName: "/auth/signup/code",
        thunkAction: async ({username, password, code}, thunkAPI) => {
            await getHttpClient().post("/sign-up-complete", {
                username: username,
                code: code
            });
            await signIn({username: username, password: password});
        },
        showToastOnSuccess: true,
        showToastOnFail: true
    }
);

const initialState = {
    ...signInInitialState,
    ...getAuthInitialState,
    ...completePasswordInitialState,
    ...forgotPasswordInitialState,
    ...forgotPasswordCompleteInitialState,
    ...signUpInitialState,
    ...signUpCodeInitialState
}

const authSlice = createSlice(
    {
        name: 'auth',
        initialState,
        reducers: {
            resetState: (state, action) => createResetState(state, action, initialState)
        },
        extraReducers: {
            ...signInExtraReducers,
            ...getAuthExtraReducers,
            ...completePasswordExtraReducers,
            ...forgotPasswordExtraReducers,
            ...forgotPasswordCompleteExtraReducers,
            ...signUpExtraReducers,
            ...signUpCodeExtraReducers
        }
    }
);
const authReducer = authSlice.reducer;
const resetState = authSlice.actions.resetState;

export {
    AUTH_STORE_NAME,
    authReducer,
    resetState,
    signIn,
    signInStateNames,
    getAuth,
    getAuthStateNames,
    incompleteUserStateName,
    completePassword,
    completePasswordStateNames,
    forgotPassword,
    forgotPasswordStateNames,
    forgotPasswordComplete,
    forgotPasswordCompleteStateNames,
    signUp,
    signUpStateNames,
    signUpCode,
    signUpCodeStateNames
}
