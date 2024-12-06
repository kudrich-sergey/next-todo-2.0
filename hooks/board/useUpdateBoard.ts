import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Board } from "@prisma/client";

import { Api } from "@/services/api-client";

export function useUpdateBoard() {
  const queryClient = useQueryClient();

  const { mutate: updateBoard } = useMutation({
    mutationKey: ["update card"],
    mutationFn: (data: Board) => Api.boardService.update(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["boards"],
      });
    },
  });

  return { updateBoard };
}
