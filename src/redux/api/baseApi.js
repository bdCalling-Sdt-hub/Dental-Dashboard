import axios from 'axios';

export const baseURL = axios.create({
    // baseURL: "http://192.168.10.185:5004/api/v1",
    baseURL: "http://104.236.6.219:5000/api/v1",
    timeout: 1000000,
    headers: {'X-Custom-Header': 'foobar'}
});
// export const ImageConfig = "http://192.168.10.185:5004"
export const ImageConfig = "http://104.236.6.219:5000"
// export const socketURL = "http://192.168.10.185:5004";
export const socketURL = "http://104.236.6.219:5000";