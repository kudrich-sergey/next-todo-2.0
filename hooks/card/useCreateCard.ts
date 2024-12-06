import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";
import { CreateDTO } from "@/services/card";

export function useCreateCard() {
  const queryClient = useQueryClient();

  const { mutate: createCard } = useMutation({
    mutationKey: ["create card"],
    mutationFn: (data: CreateDTO) => Api.cardService.create(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { createCard };
}
