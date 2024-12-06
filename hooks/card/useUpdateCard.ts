import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Card } from "@prisma/client";
import { Api } from "@/services/api-client";

export function useUpdateCard() {
  const queryClient = useQueryClient();

  const { mutate: updateCard } = useMutation({
    mutationKey: ["update card"],
    mutationFn: (data: Card) => Api.cardService.update(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { updateCard };
}
