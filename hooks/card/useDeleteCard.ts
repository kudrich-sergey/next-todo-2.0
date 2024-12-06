import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useDeleteCard() {
  const queryClient = useQueryClient();

  const { mutate: deleteCard } = useMutation({
    mutationKey: ["delete card"],
    mutationFn: (id: string) => Api.cardService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { deleteCard };
}
