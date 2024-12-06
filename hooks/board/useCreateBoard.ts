import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { CreateDTO } from "@/services/board";
import { Api } from "@/services/api-client";
import { useModal } from "@/hooks/useModal";

export function useCreateBoard() {
  const router = useRouter();
  const { onClose } = useModal();

  const { mutate: createBoard } = useMutation({
    mutationKey: ["create board"],
    mutationFn: (data: CreateDTO) => Api.boardService.create(data),
    onSuccess(data) {
      toast.success("Доска успешно создана!");
      onClose();
      router.push(`/board/${data.id}`);
    },
  });

  return { createBoard };
}
