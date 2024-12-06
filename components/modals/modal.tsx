"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import { useModalDismiss } from "@/hooks/useModalDismiss";
import styles from "./modal.module.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const [active, setActive] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);
  useModalDismiss(ref, onClose);

  useEffect(() => {
    setActive(isOpen);
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className={clsx(styles.fixed_overlay, {
            [styles.active]: active,
          })}
        >
          <div
            ref={ref}
            className={clsx(styles.modal, {
              [styles.active]: active,
            })}
          >
            <button onClick={onClose} type="button" className={styles.close}>
              <i className={`ic-close`} />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
