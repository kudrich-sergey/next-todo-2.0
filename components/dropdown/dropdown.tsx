import { ReactNode, useLayoutEffect, useRef } from "react";
import clsx from "clsx";

import { useModalDismiss } from "@/hooks/useModalDismiss";
import { IPosition } from "./useDropdown";
import styles from "./dropdown.module.scss";

interface DropdownProps {
  children: ReactNode;
  isOpen: boolean;
  position: IPosition;
  onClose: () => void;
}

interface DropdownItemProps {
  children: ReactNode;
  onClick: () => void;
}

export const Dropdown = ({
  children,
  isOpen,
  position,
  onClose,
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useModalDismiss(ref, onClose);

  useLayoutEffect(() => {
    if (position) {
      let newX: number = 0;
      let newY: number = 0;
      const offset: number = 15;

      const contextMenu = ref.current!;
      const rect = contextMenu.getBoundingClientRect();

      if (window.innerWidth - position.clientX > rect.width + offset) {
        newX = position.clientX;
      } else {
        newX = position.clientX - rect.width + offset;
      }

      if (window.innerHeight - position.clientY > rect.height) {
        newY = position.clientY;
      } else {
        newY = position.clientY - rect.height;
      }

      contextMenu.style.left = `${newX}px`;
      contextMenu.style.top = `${newY}px`;
    }
  }, [position]);

  return (
    <div className={styles.overlay}>
      <div
        ref={ref}
        className={clsx(styles.menu, {
          [styles.show]: isOpen,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Dropdown.Item = ({ children, onClick }: DropdownItemProps) => {
  return (
    <div onClick={onClick} className={styles.item}>
      {children}
    </div>
  );
};
