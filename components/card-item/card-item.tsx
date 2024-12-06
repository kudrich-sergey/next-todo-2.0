import {
  ChangeEvent,
  ElementRef,
  FocusEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { Draggable } from "@hello-pangea/dnd";
import clsx from "clsx";
import { Card } from "@prisma/client";

import { CardOptions } from "@/components/card-options";
import { useUpdateCard } from "@/hooks/card/useUpdateCard";
import styles from "./card-item.module.scss";

interface CardItemProps {
  data: Card;
  index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<ElementRef<"textarea">>(null);

  const date = new Date(data.createdAt).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const { updateCard } = useUpdateCard();

  const enableEditing = () => {
    setIsEditing(true);
    setTitle(data.title);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const handleOnFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    event.target.selectionStart = event.target.selectionEnd =
      event.target.value.length;
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const handleOnKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.code == "Enter") {
      event.preventDefault();
      updateCard({ ...data, title });
      ref.current?.blur();
    }
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  const handleToggle = () => {
    updateCard({ ...data, isCompleted: !data.isCompleted });
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
          onFocus={handleOnFocus}
          value={title}
        />
      ) : (
        <Draggable draggableId={data.id} index={index}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              //role="button"
            >
              <div className={styles.card}>
                <svg
                  onClick={handleToggle}
                  className={clsx(styles.icon, {
                    [styles.completed]: data.isCompleted,
                  })}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span
                  className={clsx({
                    [styles.title]: data.isCompleted,
                  })}
                >
                  {data.title}
                </span>
                <CardOptions cardId={data.id} onEditing={enableEditing} />
                <span className={styles.date}>{date}</span>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};
