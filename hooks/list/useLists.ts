import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Api } from "@/services/api-client";
import { ListWithCards } from "@/components/list-container/types";

export function useLists(boardId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["lists"],
    queryFn: () => Api.listService.getByBoardId(boardId),
  });

  const [lists, setLists] = useState<ListWithCards[] | undefined>(data);

  useEffect(() => {
    setLists(data);
  }, [data]);

  return { lists, setLists, isLoading };
}
