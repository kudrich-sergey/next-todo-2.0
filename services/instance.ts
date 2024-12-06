import axios, { type CreateAxiosDefaults } from "axios";
import { toast } from "react-toastify";
import { errorCatch } from "./error";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  //отправка куков вместе с запросом
  //withCredentials: true,
};

const axiosInstance = axios.create(options);

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    toast.error(errorCatch(error));

    throw error;
  }
);

export { axiosInstance };
