import axios, { CreateAxiosDefaults } from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8080/";

const options: CreateAxiosDefaults = {
  baseURL: API_URL,
  withCredentials: true,
};

const $api = axios.create(options);

const $apiAuth = axios.create({
  baseURL: API_URL,
});


$api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("token");
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export { $apiAuth, $api };