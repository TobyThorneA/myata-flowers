// // =========================
// // src/components/bouquetModal/BouquetModal.tsx
// // =========================
import { usePortalRoot } from "@hooks/usePortalRoot";
import type { IBouquet } from "@pages/admin/types";
import { useAppSelector } from "@store/app/hook";
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { type Location, useLocation, useNavigate, useParams } from "react-router-dom";

import BouquetInfo from "./BouquetInfo";
import CloseButton from "./CloseButton";
import ImageGallery from "./ImageGallery";

interface BouquetModalProps {
  bouquet?: IBouquet;
  onClose?: () => void;
}

type ModalLocationState = {
  backgroundLocation?: Location;
};

const BouquetModal: React.FC<BouquetModalProps> = ({ bouquet: propBouquet }) => {
  const { id, bouquetId } = useParams<{ id?: string; bouquetId?: string }>();
  const routeBouquetId = id ?? bouquetId;

  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as ModalLocationState | null;

  const modalRoot = usePortalRoot("modal-root");
  const bouquets = useAppSelector((state) => state.bouquet.items);
  const bouquet = propBouquet || bouquets.find((b) => b._id === routeBouquetId);
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleClose = () => {
    const backgroundLocation = locationState?.backgroundLocation;
    const to = backgroundLocation
      ? `${backgroundLocation.pathname}${backgroundLocation.search}${backgroundLocation.hash}`
      : "/";

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
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
        <div className="text-xl text-white">Загрузка букета...</div>
      </div>
    );
  }

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-color-text bg-opacity-70 p-4 backdrop-blur-sm md:pt-8"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="mt-8 flex w-full max-w-5xl flex-col overflow-visible rounded-2xl bg-bg-card shadow-xl md:mt-0 md:flex-row"
        style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      >
        <CloseButton handleClose={handleClose} />

        {/* Фото-секция */}

        <ImageGallery id={routeBouquetId} />

        {/* Инфо-секция */}

        <BouquetInfo bouquet={bouquet} />
      </div>
    </div>,
    modalRoot,
  );
};

export default BouquetModal;
