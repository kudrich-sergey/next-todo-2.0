import {
  ChangeEvent,
  ElementRef,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Board } from "@prisma/client";

import { BoardOptions } from "@/components/board-options";
import { useUpdateBoard } from "@/hooks/board/useUpdateBoard";
import styles from "./board-item.module.scss";

interface BoardItemProps {
  data: Board;
}

export const BoardItem = ({ data }: BoardItemProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<ElementRef<"input">>(null);

  const { updateBoard } = useUpdateBoard();

  const enableEditing = () => {
    setIsEditing(true);
    setTitle(data.title);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code == "Enter") {
      event.preventDefault();
      updateBoard({ ...data, title });
      ref.current?.blur();
    }
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  return (
    <div className={styles.board}>
      <div
        className={styles.background}
        style={{ backgroundImage: `url(${data.imageSmall})` }}
      >
        <Link href={`/board/${data.id}`} className={styles.link}></Link>
      </div>
      <div className={styles.title}>
        {isEditing ? (
          <input
            autoFocus
            ref={ref}
            placeholder="Введите название доски..."
            className={styles.input}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={disableEditing}
            value={title}
          />
        ) : (
          <span>{data.title}</span>
        )}
      </div>
      <BoardOptions boardId={data.id} onEditing={enableEditing} />
    </div>
  );
};
