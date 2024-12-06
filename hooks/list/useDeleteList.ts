import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useDeleteList() {
  const queryClient = useQueryClient();

  const { mutate: deleteList } = useMutation({
    mutationKey: ["delete list"],
    mutationFn: (id: string) => Api.listService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { deleteList };
}
