import { MouseEvent } from "react";

import { Dropdown, useDropdownMenu } from "@/components/dropdown";
import { useCopyCard } from "@/hooks/card/useCopyCard";
import { useDeleteCard } from "@/hooks/card/useDeleteCard";
import styles from "./card-options.module.scss";

interface CardOptionsProps {
  cardId: string;
  onEditing: () => void;
}

export const CardOptions = ({ cardId, onEditing }: CardOptionsProps) => {
  const { position, isOpen, setPosition, onClose } = useDropdownMenu();

  const { copyCard } = useCopyCard();
  const { deleteCard } = useDeleteCard();

  const handleRename = () => {
    onEditing();
    onClose();
  };

  const handleCopy = () => {
    copyCard(cardId);
    onClose();
  };

  const handleDelete = () => {
    deleteCard(cardId);
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
