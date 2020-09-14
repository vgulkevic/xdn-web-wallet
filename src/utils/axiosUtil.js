import axios from "axios";
import {authenticateUserStateNames, USER_SESSION_STORE_NAME} from "../redux/userSessionSlice";

const client = axios.create({
    baseURL: 'http://localhost:3050',
    headers: {}
});

client.interceptors.response.use((response) => response, (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        if (error.response.data.message !== "No message available")
            throw new Error(error.response.data.message);
        else
            throw new Error("Sorry, something went wrong");
    } else if (error.message) {
        throw new Error(error.message);
    }

    throw error;
});

export function getHttpClient() {
    return client;
}

export function geHttpClientWithApiKey({getState}) {
    const c = getHttpClient();

    let token;
    if (getState()[USER_SESSION_STORE_NAME] && getState()[USER_SESSION_STORE_NAME][authenticateUserStateNames.entity]) {
        token = getState()[USER_SESSION_STORE_NAME][authenticateUserStateNames.entity].token;
    }

    if (!token) {
        throw new Error('No user token');
    }

    c.defaults.headers['x-token'] = token;
    return c;
}