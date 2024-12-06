import {
  ChangeEvent,
  ElementRef,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import clsx from "clsx";

import { ListWithCards } from "@/components/list-container/types";
import { ListOptions } from "@/components/list-options";
import { AddCard } from "@/components/add-card";
import { CardItem } from "@/components/card-item";
import { useUpdateList } from "@/hooks/list/useUpdateList";
import styles from "./list-item.module.scss";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef<ElementRef<"input">>(null);

  const { updateList } = useUpdateList();

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
      updateList({ ...data, title });
      ref.current?.blur();
    }
    if (event.key === "Escape") {
      disableEditing();
    }
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.draggable}
        >
          <div
            className={styles.list}
            style={{
              borderColor: ` ${data.color}`,
              backgroundColor: `${data.background}`,
            }}
          >
            <div className={styles.header}>
              {isEditing ? (
                <input
                  autoFocus
                  ref={ref}
                  placeholder="Введите название списка..."
                  className={styles.input}
                  onChange={handleOnChange}
                  onKeyDown={handleOnKeyDown}
                  onBlur={disableEditing}
                  value={title}
                />
              ) : (
                <div className={styles.title}>{data.title}</div>
              )}
              <ListOptions listId={data.id} onEditing={enableEditing} />
            </div>
            <AddCard listId={data.id} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={clsx(styles.cards, {
                    [styles.offset]: data.cards.length > 0,
                  })}
                >
                  {data.cards.map((card, index) => (
                    <CardItem key={card.id} data={card} index={index} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};
