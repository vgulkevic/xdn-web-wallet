export const profile = {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://api.digitalnote.org/' : 'http://localhost:7777',
    socketUrl: process.env.NODE_ENV === 'production' ? 'https://api.digitalnote.org/' : 'http://localhost:3030',
    AWS_REGION: process.env.NODE_ENV === 'production' ? 'eu-central-1' : 'eu-central-1',
    USER_POOL_ID: process.env.NODE_ENV === 'production' ? 'eu-central-1_TussTTJff' : 'eu-central-1_TussTTJff',
    USER_POOL_CLIENT_ID: process.env.NODE_ENV === 'production' ? '2vfmjvmc2h4p1uvcg8vvk8cbp0' : '2vfmjvmc2h4p1uvcg8vvk8cbp0'
}