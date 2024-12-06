"use client";

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { ListItem } from "@/components/list-item";
import { ListForm } from "@/components/list-form";
import { Skeleton } from "@/components/skeleton";
import { useLists } from "@/hooks/list/useLists";
import { useUpdateOrderList } from "@/hooks/list/useUpdateOrderList";
import { useUpdateOrderCard } from "@/hooks/card/useUpdateOrderCard";
import { reorder } from "@/lib/reorder";
import styles from "./list-container.module.scss";

interface ListContainerProps {
  boardId: string;
}

export const ListContainer = ({ boardId }: ListContainerProps) => {
  const { lists, setLists, isLoading } = useLists(boardId);
  const { updateOrderList } = useUpdateOrderList();
  const { updateOrderCard } = useUpdateOrderCard();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "list" && lists) {
      const reorderedLists = reorder(
        lists,
        source.index,
        destination.index
      ).map((list, index) => ({ ...list, order: index }));
      setLists(reorderedLists);
      updateOrderList(reorderedLists);
    }

    if (type === "card" && lists) {
      const newLists = [...lists];

      const sourceList = newLists.find(
        (list) => list.id === source.droppableId
      );

      const destList = newLists.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destList.cards) {
        destList.cards = [];
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, index, arr) => {
          card.order = arr.length - index;
        });

        sourceList.cards = reorderedCards;

        setLists(newLists);
        updateOrderCard(reorderedCards);
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index, arr) => {
          card.order = arr.length - index;
        });

        destList.cards.forEach((card, index, arr) => {
          card.order = arr.length - index;
        });

        setLists(newLists);
        updateOrderCard(destList.cards);
      }
    }
  };

  if (isLoading) return <ListContainer.Skeleton />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.lists}
          >
            {lists &&
              lists.map((list, index) => (
                <ListItem key={list.id} index={index} data={list} />
              ))}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <div className={styles.shrink} />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

ListContainer.Skeleton = () => {
  return (
    <div className={styles.lists}>
      <Skeleton width="272" height="78" />
      <Skeleton width="272" height="56" />
    </div>
  );
};
