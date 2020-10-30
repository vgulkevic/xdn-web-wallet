import axios from "axios";
import {profile} from "../profile";
import {Auth} from "@aws-amplify/auth";

const client = axios.create({
    baseURL: profile.apiUrl,
    headers: {}
});

const clientWithoutBaseUrl = axios.create({
    headers: {}
});

[client, clientWithoutBaseUrl].forEach((cl) => {
    cl.interceptors.response.use((response) => response, (error) => {

        if (error.response && error.response.data) {

            if (error.response.data.message) {
                if (error.response.data.message !== "No message available")
                    throw new Error(error.response.data.message);
                else
                    throw new Error("Sorry, something went wrong");
            } else {
                throw new Error(error.response.data);
            }

        } else if (error.message) {
            throw new Error(error.message);
        }

        throw error;
    });
})

export function getHttpClient() {
    return client;
}

export function getHttpClientWithoutBaseUrl() {
    return clientWithoutBaseUrl;
}

export const geHttpClientWithApiKey = async () => {
    const c = getHttpClient();

    let token = await getAuthToken();

    if (!token) {
        throw new Error('No user token');
    }

    c.defaults.headers['x-token'] = token;
    return c;
}

export const getAuthToken = async () => {
    const user = await Auth.currentSession();
    if (!user) {
        await Auth.signOut();
        // force re-login
        window.location = "/auth";
    }

    return user.getIdToken().getJwtToken();
}
