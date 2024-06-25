import axios from 'axios';

export const baseURL = axios.create({
    // baseURL: "http://192.168.10.16:5001/api/v1",
    baseURL: "http://209.38.136.64:5000/api/v1",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
// export const ImageConfig = "http://192.168.10.16:5001"
export const ImageConfig = "http://209.38.136.64:5000"
// export const socketURL = "http://192.168.10.16:5001";
export const socketURL = "http://209.38.136.64:5000";