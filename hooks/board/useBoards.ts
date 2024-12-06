import { useQuery } from "@tanstack/react-query";

import { Api } from "@/services/api-client";

export function useBoards() {
  const { data, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: () => Api.boardService.getAll(),
  });

  return { boards: data, isLoading };
}
