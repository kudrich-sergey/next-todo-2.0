import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useDeleteBoard() {
  const queryClient = useQueryClient();

  const { mutate: deleteBoard } = useMutation({
    mutationKey: ["delete board"],
    mutationFn: (id: string) => Api.boardService.delete(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });

  return { deleteBoard };
}
