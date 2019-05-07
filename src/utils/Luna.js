import axios from "axios/index";

const luna = axios.create({
  // Luna API Endpoint
  baseURL: 'https://luna.toast.one/api',
  headers: {
    Accept: 'application/json',
  },
  responseType: 'json'
});

luna.defaults.headers.common['Authorization'] = "Token " + "null";

export default luna;