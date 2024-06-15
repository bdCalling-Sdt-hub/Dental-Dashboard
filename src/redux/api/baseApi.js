import axios from 'axios';

export const baseURL = axios.create({
    baseURL: "http://192.168.10.16:5001/api/v1",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
export const ImageConfig = "http://192.168.10.16:5001"
export const socketURL = "http://192.168.10.16:5001";