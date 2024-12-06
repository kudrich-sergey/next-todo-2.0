import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useCopyCard() {
  const queryClient = useQueryClient();

  const { mutate: copyCard } = useMutation({
    mutationKey: ["copy card"],
    mutationFn: (id: string) => Api.cardService.copy(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { copyCard };
}
