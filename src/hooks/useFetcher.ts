import axios from "axios";
import useLocalStorage from "./useLocalStorage";
import { API_URL } from "../config/api";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Accept"] = "application/json";

const axiosInterceptor = (userData) => {
  axios.interceptors.request.use((config) => {
    if (userData.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
    return config;
  });
};

const useFetcher = () => {
  const [userData, setUserData] = useLocalStorage("userData");

  const fetcher = async (url: any, config: any = {}, body: any = {}) => {
    let configs = {
      ...config,
      url,
      headers: {
        ...config?.headers,
      },
      data: body,
    };

    try {
      axiosInterceptor(userData);
      let res = await axios.request(configs);
      return res;
    } catch (err: any) {
      throw err?.response;
    }
  };

  return fetcher;
};

export default useFetcher;