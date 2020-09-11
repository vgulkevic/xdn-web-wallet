import axios from "axios";

const client = axios.create({
    baseURL: '',
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
    // if(apiKey)
    //     c.defaults.headers['x-api-key'] = apiKey;
    return c;
}