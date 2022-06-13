import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";

const modalElement = document.getElementById("modal-root");

export function Modal({ children, fade = false, open = false, onClose }) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);


  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`fixed overflow-hidden top-0 left-0 right-0 bottom-0 bg-gray-600 flex w-full h-full z-50 border-box p-4 ${fade ? "modal-fade" : ""}`} onClick={close}>
        <span
          role="button"
          className="absolute right-4 top-2 cursor-pointer text-gray-300 bg-gray-400 hover:bg-gray-500 text-xl p-4 rounded-full w-5 h-5 flex items-center justify-center z-[999] text-center"
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className="z-[2] relative mt-0 w-full h-full overflow-x-hidden overflow-y-auto m-4">{children}</div>
      </div>
    ) : null,
    modalElement
  );
}

export default Modal;
