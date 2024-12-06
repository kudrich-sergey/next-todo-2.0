import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";
import { CreateDTO } from "@/services/list";

export function useCreateList() {
  const queryClient = useQueryClient();

  const { mutate: createList } = useMutation({
    mutationKey: ["create list"],
    mutationFn: (data: CreateDTO) => Api.listService.create(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { createList };
}
