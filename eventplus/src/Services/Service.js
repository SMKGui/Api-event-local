import axios from "axios";

const apiPort = "5000";
// const localApi = `http://localhost:${apiPort}/api`;
// const externalApi = null;
const externalApiUri = "https://webapieventguiluiz.azurewebsites.net/api";

const api = axios.create({
  //baseURL: localApi,
  baseURL: externalApiUri
});

export default api;
