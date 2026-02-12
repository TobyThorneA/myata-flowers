import { useEffect } from "react";

export function useModalEscapeClose<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  onClose: () => void
) {
  useEffect(() => {
    // Сохраняем текущее состояние прокрутки
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && e.target === ref.current) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.body.style.overflow = originalOverflow; // восстанавливаем
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, onClose]);
}