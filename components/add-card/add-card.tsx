import {
  ChangeEvent,
  ElementRef,
  KeyboardEvent,
  useRef,
  useState,
} from "react";

import { useCreateCard } from "@/hooks/card/useCreateCard";
import styles from "./add-card.module.scss";

export const AddCard = ({ listId }: { listId: string }) => {
  const [title, setTitle] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<ElementRef<"textarea">>(null);

  const { createCard } = useCreateCard();

  const enableEditing = () => {
    setIsEditing(true);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code == "Enter") {
      event.preventDefault();
      createCard({ listId, title });
      setTitle("");
      ref.current?.blur();
    }
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  return (
    <>
      {isEditing ? (
        <textarea
          autoFocus
          placeholder="Введите название задачи…"
          className={styles.textarea}
          ref={ref}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onBlur={disableEditing}
          value={title}
        />
      ) : (
        <button className={styles.adding} onClick={enableEditing}>
          <i className={`ic-add`} />
          Добавить задачу
        </button>
      )}
    </>
  );
};
