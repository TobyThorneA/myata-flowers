// // =========================
// // src/components/bouquetModal/BouquetModal.tsx
// // =========================
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@store/app/hook";
import type { IBouquet } from "@pages/admin/types";
import ImageGallery from "./ImageGallery";
import BouquetInfo from "./BouquetInfo";
import CloseButton from "./CloseButton";
import { usePortalRoot } from "@hooks/usePortalRoot";

interface BouquetModalProps {
  bouquet?: IBouquet;
  onClose?: () => void;
}

const BouquetModal: React.FC<BouquetModalProps> = ({ bouquet: propBouquet }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const modalRoot = usePortalRoot("modal-root");
  const bouquets = useAppSelector((state) => state.bouquet.items);
  const bouquet = propBouquet || bouquets.find((b) => b._id === id);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    const to = (location.state as any)?.backgroundLocation || '/';

    navigate(to, { replace: true });
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  

  if (!bouquet?.images?.length) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
        <div className="text-white text-xl">Загрузка букета...</div>
      </div>
    );
  }

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[1000] bg-color-text bg-opacity-70 backdrop-blur-sm overflow-y-auto p-4 flex justify-center items-start md:pt-8"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-bg-card rounded-2xl shadow-xl w-full max-w-5xl mt-8 md:mt-0 flex flex-col md:flex-row overflow-visible"
        style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      >

        <CloseButton handleClose={handleClose}/>

        {/* Фото-секция */}

        <ImageGallery id={id}/>

        {/* Инфо-секция */}

        <BouquetInfo bouquet={bouquet}/>

      </div>
    </div>,
    modalRoot
  );
};

export default BouquetModal;
