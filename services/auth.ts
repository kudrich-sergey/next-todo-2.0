import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { IAuthForm } from "@/components/form-auth/form.interface";

export const authService = {
  async main(type: "login" | "register", data: IAuthForm) {
    return (await axiosInstance.post(ApiRoutes.AUTH + `/${type}`, data)).data;
  },

  async logout() {
    await axiosInstance.post(ApiRoutes.AUTH + "/logout");
  },
};
