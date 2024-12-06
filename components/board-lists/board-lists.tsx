import { Board } from "@prisma/client";

import { BoardItem } from "@/components/board-item";
import { ModalCreateBoard } from "@/components/modals";
import { Skeleton } from "@/components/skeleton";
import { useModal } from "@/hooks/useModal";
import styles from "./board-lists.module.scss";

interface BoardListProps {
  boards: Board[] | undefined;
}

export const BoardList = ({ boards = [] }: BoardListProps) => {
  const { isOpen, onOpen, onClose } = useModal();

  return (
    <>
      <div className={styles.boards}>
        {boards.map((board) => (
          <BoardItem key={board.id} data={board} />
        ))}
        <button onClick={onOpen} className={styles.button}>
          Создать новую доску
        </button>
      </div>
      <ModalCreateBoard isOpen={isOpen} onClose={onClose} />
    </>
  );
};

BoardList.Skeleton = () => {
  return (
    <div className={styles.boards}>
      <Skeleton width="235" height="147" />
      <Skeleton width="235" height="147" />
      <Skeleton width="235" height="147" />
      <Skeleton width="235" height="147" />
    </div>
  );
};
