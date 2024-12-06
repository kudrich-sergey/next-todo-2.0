import { Board } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export type CreateDTO = {
  title: string;
  imageSmall: string | undefined;
  imageMedium: string | undefined;
};

export const boardService = {
  async getAll(): Promise<Board[]> {
    return (await axiosInstance.get<Board[]>(ApiRoutes.BOARD)).data;
  },

  async create(data: CreateDTO): Promise<Board> {
    return (await axiosInstance.post(ApiRoutes.BOARD, data)).data;
  },

  async update(data: Board): Promise<Board> {
    return (await axiosInstance.put(ApiRoutes.BOARD + "/update", data)).data;
  },

  async delete(id: string): Promise<Board> {
    return (await axiosInstance.delete(ApiRoutes.BOARD + `/${id}`)).data;
  },
};
