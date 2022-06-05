import { useEffect } from "react";
import Modal from "../components/Modal";
import {
  createContext,
  useCallback,
  useState,
  useMemo,
  useContext,
} from "react";
import ModalImage from "../components/ModalImage";

export function useClickOutside(innerRef, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      event.stopPropagation();
      if (
        innerRef.current &&
        !innerRef.current.contains(event.target) &&
        event.target.contains(innerRef.current)
      ) {
        callback(event);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, innerRef]);
}

export const removeDulpicateImages = (prevPhotos, nextPhotos) => {
  if (!nextPhotos) {
    return [];
  }
  const filteredPhotos = nextPhotos.filter((current) => {
    return !prevPhotos.some((checkPhoto) => checkPhoto.id === current.id);
  });
  return [...prevPhotos, ...filteredPhotos];
};

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [modalImage, setModalImage] = useState(null);
  const showImage = useCallback((image) => {
    setModalImage(image);
  }, []);

  const disableModal = useCallback(() => {
    setModalImage(null);
  }, []);

  const providerValue = useMemo(() => ({ showImage }), [showImage]);
  return (
    <ModalContext.Provider value={providerValue}>
      {children}
      <Modal onClose={disableModal} open={!!modalImage} fade={true}>
        <ModalImage image={modalImage} />
      </Modal>
    </ModalContext.Provider>
  );
};

export function useModal() {
  const context = useContext(ModalContext);
  return { showImage: context.showImage };
}

export function debounce (callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}