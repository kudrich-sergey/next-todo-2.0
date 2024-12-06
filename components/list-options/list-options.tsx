import { MouseEvent } from "react";

import { Dropdown, useDropdownMenu } from "@/components/dropdown";
import { useCopyList } from "@/hooks/list/useCopyList";
import { useDeleteList } from "@/hooks/list/useDeleteList";
import styles from "./list-options.module.scss";

interface ListOptionsProps {
  listId: string;
  onEditing: () => void;
}

export const ListOptions = ({ listId, onEditing }: ListOptionsProps) => {
  const { position, isOpen, setPosition, onClose } = useDropdownMenu();

  const { copyList } = useCopyList();
  const { deleteList } = useDeleteList();

  const handleRename = () => {
    onEditing();
    onClose();
  };

  const handleCopy = () => {
    copyList(listId);
    onClose();
  };

  const handleDelete = () => {
    deleteList(listId);
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
          <Dropdown.Item onClick={handleCopy}>
            <i className={`ic-duplicate`} />
            Дублировать
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
