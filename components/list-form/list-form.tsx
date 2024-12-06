import { useRef, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { InputField } from "@/components/input-field";
import { ColorPicker } from "@/components/color-picker";
import { COLOR_CONSTANTS } from "@/components/color-picker/color-constants";
import { useCreateList } from "@/hooks/list/useCreateList";
import { useModalDismiss } from "@/hooks/useModalDismiss";
import styles from "./list-form.module.scss";

export const ListForm = ({ boardId }: { boardId: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [selectedColor, setSelectedColor] = useState<
    (typeof COLOR_CONSTANTS)[number]
  >(COLOR_CONSTANTS[0]);

  const { createList } = useCreateList();

  const enableEditing = () => {
    setIsEditing(true);
  };
  const disableEditing = () => {
    setIsEditing(false);
    reset();
  };

  const ref = useRef<HTMLDivElement>(null);
  useModalDismiss(ref, disableEditing);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ title: string }>();

  const onSubmit: SubmitHandler<{ title: string }> = ({ title }) => {
    startTransition(() => {
      createList({
        boardId,
        title,
        color: selectedColor.color,
        background: selectedColor.background,
      });

      disableEditing();
    });
  };

  return (
    <>
      {isEditing ? (
        <div className={styles.list_form} ref={ref}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <button
              onClick={disableEditing}
              type="button"
              className={styles.close}
            >
              <i className={`ic-clear`} />
            </button>
            <InputField
              title="Название"
              disabled={isPending}
              error={errors.title}
              {...register("title", {
                required: "Это поле не может быть пустым!",
              })}
            />
            <ColorPicker
              selected={selectedColor}
              onSelected={setSelectedColor}
            />
            <button
              type="submit"
              className={styles.create}
              disabled={isPending}
            >
              Добавить
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={enableEditing}
          type="button"
          className={styles.new_list}
        >
          <i className={`ic-add`} />
          Добавить список
        </button>
      )}
    </>
  );
};
