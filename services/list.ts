import { List } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";
import { ListWithCards } from "@/components/list-container/types";

export type CreateDTO = {
  boardId: string;
  title: string;
  color: string;
  background: string;
};

export const listService = {
  async getByBoardId(boardId: string): Promise<ListWithCards[]> {
    return (
      await axiosInstance.get<ListWithCards[]>(ApiRoutes.LIST + `/${boardId}`)
    ).data;
  },

  async create(data: CreateDTO): Promise<List> {
    return (await axiosInstance.post(ApiRoutes.LIST, data)).data;
  },

  async updateOrder(data: List[]): Promise<List[]> {
    return (await axiosInstance.put(ApiRoutes.LIST + "/update-order", data))
      .data;
  },

  async update(data: List): Promise<List> {
    return (await axiosInstance.put(ApiRoutes.LIST + "/update", data)).data;
  },

  async copy(id: string): Promise<List> {
    return (await axiosInstance.post(ApiRoutes.LIST + "/copy", id)).data;
  },

  async delete(id: string): Promise<List> {
    return (await axiosInstance.delete(ApiRoutes.LIST + `/${id}`)).data;
  },
};
