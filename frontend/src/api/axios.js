import axios from "axios";

const instance = axios.create({
  baseURL: "https://e-comerce-mern-backend.onrender.com/api",
});

export default instance;
