export const profile = {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://api.digitalnote.org/' : 'http://localhost:7777',
    socketUrl: process.env.NODE_ENV === 'production' ? 'https://api.digitalnote.org/' : 'http://localhost:3030',
}