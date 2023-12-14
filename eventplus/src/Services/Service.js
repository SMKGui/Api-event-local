import axios from "axios";

const apiPort = "7118";
const localApi = `http://localhost:${apiPort}/api`;

const externalApiUri = "https://webapieventguiluiz.azurewebsites.net/api";

const api = axios.create({
  // baseURL: localApi
  baseURL: externalApiUri
});

export default api;
