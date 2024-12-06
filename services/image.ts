import { axiosInstance } from "./instance";
import { Images } from "@prisma/client";
import { ApiRoutes } from "./constants";

export const imageService = {
  async getRandomImages(): Promise<Images[]> {
    return (await axiosInstance.get<Images[]>(ApiRoutes.IMAGE)).data;
  },
};
