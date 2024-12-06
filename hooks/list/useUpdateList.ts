import { useMutation, useQueryClient } from "@tanstack/react-query";
import { List } from "@prisma/client";

import { Api } from "@/services/api-client";

export function useUpdateList() {
  const queryClient = useQueryClient();

  const { mutate: updateList } = useMutation({
    mutationKey: ["update list"],
    mutationFn: (data: List) => Api.listService.update(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["lists"],
      });
    },
  });

  return { updateList };
}
