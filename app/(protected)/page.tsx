"use client";

import { BoardList } from "@/components/board-lists";
import { useBoards } from "@/hooks/board/useBoards";

export default function Board() {
  const { boards, isLoading } = useBoards();

  if (isLoading) return <BoardList.Skeleton />;

  return <BoardList boards={boards} />;
}
