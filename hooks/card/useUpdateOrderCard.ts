import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Card } from "@prisma/client";
import { Api } from "@/services/api-client";

export function useUpdateOrderCard() {
  const queryClient = useQueryClient();

  const { mutate: updateOrderCard } = useMutation({
    mutationKey: ["update order card"],
    mutationFn: (data: Card[]) => Api.cardService.updateOrder(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { updateOrderCard };
}
