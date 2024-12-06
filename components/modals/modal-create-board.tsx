import { useState, useTransition } from "react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Images } from "@prisma/client";

import { Modal } from "@/components/modals";
import { InputField } from "@/components/input-field";
import { useRandomImages } from "@/hooks/useRandomImages";
import { useCreateBoard } from "@/hooks/board/useCreateBoard";
import { CreateDTO } from "@/services/board";
import { random } from "@/lib/random";
import styles from "./modal-create-board.module.scss";

interface ModalCreateBoard {
  isOpen: boolean;
  onClose: () => void;
}

export const ModalCreateBoard = ({ isOpen, onClose }: ModalCreateBoard) => {
  const [isPending, startTransition] = useTransition();
  const [selectedImage, setSelectedImage] = useState<Images | null>(null);

  const { images } = useRandomImages();
  const { createBoard } = useCreateBoard();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDTO>();

  const onSubmit: SubmitHandler<{ title: string }> = ({ title }) => {
    startTransition(() => {
      const randomImages = random(0, 8);

      createBoard({
        title,
        imageSmall:
          selectedImage?.imageSmall ||
          (images && images[randomImages].imageSmall),
        imageMedium:
          selectedImage?.imageMedium ||
          (images && images[randomImages].imageMedium),
      });
    });
  };

  const handleOnClose = () => {
    reset();
    setSelectedImage(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Создать доску</h2>
        <div className={styles.pickers}>
          {images &&
            images.map((image) => (
              <div
                className={styles.picker}
                key={image.id}
                onClick={() => setSelectedImage(image)}
              >
                <Image src={image.imageSmall} alt="image" fill />
                {selectedImage?.id === image.id && (
                  <div className={styles.selected}>
                    <svg
                      className={styles.icon}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      //fill="none"
                      fill="#a6f578"
                      //stroke="currentColor"
                      stroke="#0faf1b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    {/*<svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#30d158"
                      stroke="#1d1d1d"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>*/}
                  </div>
                )}
              </div>
            ))}
        </div>
        <InputField
          title="Название"
          disabled={isPending}
          error={errors.title}
          {...register("title", {
            required: "Это поле не может быть пустым!",
          })}
        />
        <button type="submit" className={styles.create} disabled={isPending}>
          Создать
        </button>
      </form>
    </Modal>
  );
};
