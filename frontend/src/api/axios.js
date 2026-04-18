import axios from 'axios';

const instance = axios.create({
    baseURL: "https://your-backend-name.onrender.com/api",
});

export default instance;