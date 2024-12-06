import { MouseEvent } from "react";

import { Dropdown, useDropdownMenu } from "@/components/dropdown";
import { useDeleteBoard } from "@/hooks/board/useDeleteBoard";
import styles from "./board-options.module.scss";

interface BoardOptionsProps {
  boardId: string;
  onEditing: () => void;
}

export const BoardOptions = ({ boardId, onEditing }: BoardOptionsProps) => {
  const { position, isOpen, setPosition, onClose } = useDropdownMenu();

  const { deleteBoard } = useDeleteBoard();

  const handleRename = () => {
    onEditing();
    onClose();
  };

  const handleDelete = () => {
    deleteBoard(boardId);
    onClose();
  };

  const handleOnClick = (event: MouseEvent) => {
    event.preventDefault();

    const { currentTarget } = event;
    const targetRect = (currentTarget as HTMLElement).getBoundingClientRect();

    setPosition({
      clientX: targetRect.x,
      clientY: targetRect.y + 10,
    });
  };

  return (
    <>
      <button className={styles.icon} onClick={(event) => handleOnClick(event)}>
        <i className={`ic-dots`} />
      </button>
      {position && (
        <Dropdown isOpen={isOpen} position={position} onClose={onClose}>
          <Dropdown.Item onClick={handleRename}>
            <i className={`ic-rename`} />
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item onClick={handleDelete}>
            <i className={`ic-remove`} />
            Удалить
          </Dropdown.Item>
        </Dropdown>
      )}
    </>
  );
};
