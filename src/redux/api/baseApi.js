import axios from 'axios';

export const baseURL = axios.create({
    baseURL: "http://192.168.10.16:5000/api/v1",
    timeout: 10000,
    headers: {'X-Custom-Header': 'foobar'}
});
export const ImageConfig = "http://192.168.10.16:5000"