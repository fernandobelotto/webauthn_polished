import axios from 'axios';

export const api = axios.create({
    baseURL: `http://localhost:3333/auth`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});
