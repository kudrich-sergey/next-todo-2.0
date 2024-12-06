import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useCopyList() {
  const queryClient = useQueryClient();

  const { mutate: copyList } = useMutation({
    mutationKey: ["copy list"],
    mutationFn: (id: string) => Api.listService.copy(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { copyList };
}
