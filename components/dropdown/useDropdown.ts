import { useState } from "react";

export interface IPosition {
  clientX: number;
  clientY: number;
}

export const useDropdownMenu = () => {
  const [position, setPosition] = useState<IPosition | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOnClose = () => {
    setPosition(null);
    setIsOpen(false);
  };

  const handleOnOpen = (position: IPosition) => {
    setPosition(position);
    setTimeout(() => setIsOpen((prev) => !prev), 50);
  };

  return {
    position,
    isOpen,
    setPosition: handleOnOpen,
    onClose: handleOnClose,
  };
};
