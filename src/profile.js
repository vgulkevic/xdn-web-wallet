export const profile = {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://api.digitalnote.org/' : 'http://localhost:7777',
    socketUrl: process.env.NODE_ENV === 'production' ? 'https://api.digitalnote.org/' : 'http://localhost:3030',
    AWS_REGION: process.env.NODE_ENV === 'production' ? 'eu-central-1' : 'eu-central-1',
    USER_POOL_ID: process.env.NODE_ENV === 'production' ? 'eu-central-1_9ypMqPSyC' : 'eu-central-1_9ypMqPSyC',
    USER_POOL_CLIENT_ID: process.env.NODE_ENV === 'production' ? '1flepij10js2ekuvf643hrfluf' : '1flepij10js2ekuvf643hrfluf'
}