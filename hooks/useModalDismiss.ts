import { RefObject, useEffect } from "react";

export const useModalDismiss = (
  ref: RefObject<HTMLDivElement>,
  dismissCallback: () => void
) => {
  useEffect(() => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();

        dismissCallback();
      }
    };

    const handleMouseEvent = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        event.preventDefault();
        event.stopPropagation();

        dismissCallback();
      }
    };

    document.addEventListener("keydown", handleKeyboardEvent);
    document.addEventListener("click", handleMouseEvent, true);
    document.addEventListener("mousedown", handleMouseEvent, true);
    document.addEventListener("scroll", dismissCallback, true);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
      document.removeEventListener("click", handleMouseEvent, true);
      document.removeEventListener("mousedown", handleMouseEvent, true);
      document.removeEventListener("scroll", dismissCallback, true);
    };
  }, [ref, dismissCallback]);
};
