import { notFound } from "next/navigation";

import { ListContainer } from "@/components/list-container";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import styles from "./page.module.scss";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const user = await currentUser();

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      userId: user?.id,
    },
  });

  if (!board) {
    return notFound();
  }

  return (
    <div
      className={styles.background}
      style={{ backgroundImage: `url(${board.imageMedium})` }}
    >
      <div className={styles.shading} />
      <div className={styles.title}>{board.title}</div>
      <div className={styles.container}>
        <ListContainer boardId={params.boardId} />
      </div>
    </div>
  );
};

export default BoardIdPage;
