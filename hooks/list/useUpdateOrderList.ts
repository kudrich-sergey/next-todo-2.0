import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List } from "@prisma/client";

import { Api } from "@/services/api-client";

export function useUpdateOrderList() {
  const queryClient = useQueryClient();

  const { mutate: updateOrderList } = useMutation({
    mutationKey: ["update order list"],
    mutationFn: (data: List[]) => Api.listService.updateOrder(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { updateOrderList };
}
