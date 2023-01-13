import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
  baseURL: "https://engineering-task.elancoapps.com/api",
});

export default API;