import { Card } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";

export type CreateDTO = {
  listId: string;
  title: string;
};

export const cardService = {
  async create(data: CreateDTO): Promise<Card> {
    return (await axiosInstance.post(ApiRoutes.CARD, data)).data;
  },

  async updateOrder(data: Card[]): Promise<Card[]> {
    return (await axiosInstance.put(ApiRoutes.CARD + "/update-order", data))
      .data;
  },

  async update(data: Card): Promise<Card> {
    return (await axiosInstance.put(ApiRoutes.CARD + "/update", data)).data;
  },

  async copy(id: string): Promise<Card> {
    return (await axiosInstance.post(ApiRoutes.CARD + "/copy", id)).data;
  },

  async delete(id: string): Promise<Card> {
    return (await axiosInstance.delete(ApiRoutes.CARD + `/${id}`)).data;
  },
};
