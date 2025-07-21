import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@store/app/hook";
import OrderButton from "../orderButton/OrderButton";
import type { IBouquet } from "@pages/admin/types";

interface BouquetModalProps {
  bouquet?: IBouquet; // ❗ Сделаем optional
  onClose?: () => void;
}

const modalRoot = document.getElementById("modal-root")!;

const BouquetModal: React.FC<BouquetModalProps> = ({ bouquet: propBouquet, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // 👈 добавь выше в компоненте
  const backgroundLocation = location.state?.backgroundLocation;

  const bouquets = useAppSelector((state) => state.bouquet.items);
  const bouquet = propBouquet || bouquets.find((b) => b._id === id);

  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const oldPrice = bouquet?.oldPrice ?? 0;

  const contextButtonName = "Заказать букет";
  const watchField = true;



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

//   const handleClose = () => {
//   if (onClose) {
//     onClose();
//   } else {
//     const parts = location.pathname.split('/').filter(Boolean); // ['catalog', 'Хризантемы', '687a...']

//     if (parts.length >= 2) {
//       // Если есть категория + id → вернуть на категорию
//       const parentPath = `/${parts.slice(0, parts.length - 1).join('/')}`;
//       navigate(parentPath, { replace: true });
//     } else {
//       // Например, /687a... → вернуть на главную
//       navigate('/', { replace: true });
//     }
//   }
// };


  const handleClose = () => {
  if (onClose) {
    onClose();
  } else if (backgroundLocation) {
    // Возвращаемся туда, откуда пришли
    navigate(backgroundLocation.pathname + (backgroundLocation.search || ''), { replace: true });
  } else {
    // Если нет onClose и backgroundLocation, пытаемся по логике из твоего варианта
    const parts = location.pathname.split('/').filter(Boolean); // ['catalog', 'Хризантемы', '687a...']

    if (parts.length >= 2) {
      // Если есть категория + id → вернуть на категорию
      const parentPath = `/${parts.slice(0, parts.length - 1).join('/')}`;
      navigate(parentPath, { replace: true });
    } else {
      // Например, /687a... → вернуть на главную
      navigate('/', { replace: true });
    }
  }
};


  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      bouquet && bouquet.images ? (prev === bouquet.images.length - 1 ? 0 : prev + 1) : prev
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      bouquet && bouquet.images ? (prev === 0 ? bouquet.images.length - 1 : prev - 1) : prev
    );
  };

if (!bouquet || !bouquet.images || bouquet.images.length === 0) {
  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center">
      <div className="text-white text-xl">Загрузка букета...</div>
    </div>
  );
}

  return ReactDOM.createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[1000] bg-black bg-opacity-70 backdrop-blur-sm overflow-y-auto p-4 flex justify-center items-start md:pt-8"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="bg-colorPrimary rounded-2xl shadow-xl w-full max-w-5xl mt-8 md:mt-0 flex flex-col md:flex-row overflow-visible"
        style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
      >
        <button
          onClick={handleClose}
          aria-label="Закрыть окно"
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-color-icons text-white flex items-center justify-center hover:bg-color-action transition-colors shadow-md z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Фото-секция */}
        <div className="flex-1 p-4 md:p-6 flex flex-col min-w-[280px]">
          <img
            src={bouquet.images[currentPhotoIndex]}
            alt={bouquet.name}
            loading="lazy"
            className="rounded-xl object-cover w-full shadow-lg"
            style={{ maxHeight: "none" }}
          />

          {bouquet.images.length > 1 && (
            <>
              <div className="flex justify-center items-center mt-4 gap-4 select-none">
                <button
                  onClick={prevPhoto}
                  className="bg-color-icons text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-color-action transition-colors shadow"
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <div className="font-semibold text-color-text">
                  {currentPhotoIndex + 1} / {bouquet.images.length}
                </div>
                <button
                  onClick={nextPhoto}
                  className="bg-color-icons text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-color-action transition-colors shadow"
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-color-icons">
                {bouquet.images.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Вариант ${index + 1}`}
                    loading="lazy"
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-16 h-16 rounded-md object-cover cursor-pointer transition-shadow duration-200 ${
                      index === currentPhotoIndex
                        ? "ring-4 ring-color-action"
                        : "ring-0 hover:ring-2 hover:ring-color-icons"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Инфо-секция */}
        <div className="flex-1 bg-[#f9f9f9] p-6 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl flex flex-col min-w-0">
          <h2 id="modal-title" className="text-2xl md:text-3xl font-bold mb-4 text-color-text">
            {bouquet.name}
          </h2>

          <div className="flex items-baseline gap-6 mb-6 flex-wrap">
            {oldPrice > 0 && (
              <div className="line-through text-gray-500 text-lg md:text-xl">
                {oldPrice.toLocaleString("ru-RU")} ₽
              </div>
            )}
            <div className="text-3xl md:text-4xl font-extrabold text-color-action">
              {bouquet.price.toLocaleString("ru-RU")} ₽
            </div>
          </div>

          {bouquet.size && (
            <div className="mb-4 p-3 bg-white rounded-md shadow-sm text-color-text leading-relaxed">
              <strong>Размер:</strong> {bouquet.size}
            </div>
          )}

          <div className="mb-6 w-full">
            <OrderButton
              popup
              bouquetName={bouquet.name}
              contextNameButton={contextButtonName}
              watchField={watchField}
            />
          </div>

          {bouquet.description && (
            <div
              id="modal-description"
              className="mb-6 p-4 bg-white rounded-md shadow-sm text-color-text leading-relaxed"
            >
              <strong>Описание:</strong> {bouquet.description}
            </div>
          )}

          <div>
            <h3 className="text-xl font-semibold mb-3 text-color-text">Связаться с нами:</h3>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+79656003600"
                className="block px-4 py-3 rounded-md font-semibold text-white bg-[#4dd0af] hover:opacity-90 transition-opacity"
              >
                Позвонить: +7 (965) 600-3-600
              </a>
              <a
                href="https://wa.me/79270387435"
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-3 rounded-md font-semibold text-white bg-[#29A71A] hover:opacity-90 transition-opacity"
              >
                Написать в WhatsApp
              </a>
              <a
                href="https://t.me/myata_flow"
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-3 rounded-md font-semibold text-white bg-[#0088cc] hover:opacity-90 transition-opacity"
              >
                Написать в Telegram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default BouquetModal;










// import React, { useEffect, useState, useRef } from "react";
// import ReactDOM from "react-dom";
// import OrderButton from "../orderButton/OrderButton";
// import type { IBouquet } from "@pages/admin/types";

// interface BouquetModalProps {
//   bouquet: IBouquet
//   onClose: () => void;
// }

// const modalRoot = document.getElementById("modal-root")!;

// const BouquetModal: React.FC<BouquetModalProps> = ({ bouquet, onClose }) => {
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
//   const overlayRef = useRef<HTMLDivElement>(null);
//   const oldPrice = bouquet.oldPrice ?? 0;

//   const contextButtonName = "Заказать букет";
//   const watchField = true;

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         onClose();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       document.body.style.overflow = "auto";
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [onClose]);

//   const handleOverlayClick = (e: React.MouseEvent) => {
//     if (e.target === overlayRef.current) {
//       onClose();
//     }
//   };

//   const nextPhoto = () => {
//     setCurrentPhotoIndex((prev) =>
//       prev === bouquet.images.length - 1 ? 0 : prev + 1
//     );
//   };

//   const prevPhoto = () => {
//     setCurrentPhotoIndex((prev) =>
//       prev === 0 ? bouquet.images.length - 1 : prev - 1
//     );
//   };

//   return ReactDOM.createPortal(
//     <div
//       ref={overlayRef}
//       onClick={handleOverlayClick}
//       className="
//         fixed inset-0 z-[1000] bg-black bg-opacity-70 backdrop-blur-sm
//         overflow-y-auto
//         p-4
//         flex justify-center items-start
//         md:items-start md:pt-8
//       "
//       aria-modal="true"
//       role="dialog"
//       aria-labelledby="modal-title"
//       aria-describedby="modal-description"
//     >
//       <div
//         className="
//           bg-colorPrimary rounded-2xl shadow-xl
//           w-full max-w-5xl
//           mt-8 md:mt-0
//           flex flex-col md:flex-row
//           overflow-visible
//         "
//         style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}
//       >
//         {/* Кнопка закрытия */}
//         <button
//           onClick={onClose}
//           aria-label="Закрыть окно"
//           className="
//             absolute top-4 right-4 w-10 h-10 rounded-full
//             bg-color-icons text-white flex items-center justify-center
//             hover:bg-color-action transition-colors shadow-md z-10
//           "
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={3}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M6 18L18 6M6 6l12 12"
//             />
//           </svg>
//         </button>

//         {/* Фото-секция */}
//         <div
//           className="
//             flex-1 p-4 md:p-6
//             flex flex-col
//             min-w-[280px]
//           "
//         >
//           <img
//             src={bouquet.images[currentPhotoIndex]}
//             alt={bouquet.name}
//             loading="lazy"
//             className="
//               rounded-xl object-cover w-full
//               shadow-lg
//               max-h-none
//             "
//             style={{ maxHeight: "none" }}
//           />

//           {bouquet.images.length > 1 && (
//             <>
//               <div className="flex justify-center items-center mt-4 gap-4 select-none">
//                 <button
//                   onClick={prevPhoto}
//                   className="
//                     bg-color-icons text-white w-10 h-10 rounded-full
//                     flex items-center justify-center
//                     hover:bg-color-action transition-colors shadow
//                   "
//                   aria-label="Предыдущее фото"
//                 >
//                   ‹
//                 </button>

//                 <div className="font-semibold text-color-text">
//                   {currentPhotoIndex + 1} / {bouquet.images.length}
//                 </div>

//                 <button
//                   onClick={nextPhoto}
//                   className="
//                     bg-color-icons text-white w-10 h-10 rounded-full
//                     flex items-center justify-center
//                     hover:bg-color-action transition-colors shadow
//                   "
//                   aria-label="Следующее фото"
//                 >
//                   ›
//                 </button>
//               </div>

//               <div
//                 className="
//                   flex flex-wrap gap-3 mt-4 justify-center
//                   overflow-x-auto
//                   scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-color-icons
//                 "
//                 style={{ WebkitOverflowScrolling: "touch" }}
//               >
//                 {bouquet.images.map((photo, index) => (
//                   <img
//                     key={index}
//                     src={photo}
//                     alt={`Вариант ${index + 1}`}
//                     loading="lazy"
//                     onClick={() => setCurrentPhotoIndex(index)}
//                     className={`
//                       w-16 h-16 rounded-md object-cover cursor-pointer
//                       transition-shadow duration-200
//                       ${index === currentPhotoIndex
//                         ? "ring-4 ring-color-action"
//                         : "ring-0 hover:ring-2 hover:ring-color-icons"
//                       }
//                     `}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>

//         {/* Инфо-секция */}
//         <div
//           className="
//             flex-1 bg-[#f9f9f9] p-6
//             rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl
//             flex flex-col min-w-0
//           "
//         >
//           <h2
//             id="modal-title"
//             className="text-2xl md:text-3xl font-bold mb-4 text-color-text"
//           >
//             {bouquet.name}
//           </h2>

//           <div className="flex items-baseline gap-6 mb-6 flex-wrap">

//             {oldPrice > 0 &&  (
//               <div className="line-through text-gray-500 text-lg md:text-xl">
//                 {oldPrice.toLocaleString("ru-RU")} ₽
//               </div>
//             )}
//             <div className="text-3xl md:text-4xl font-extrabold text-color-action">
//               {bouquet.price.toLocaleString("ru-RU")} ₽
//             </div>
//           </div>

//           {bouquet.size && (
//             <div className="mb-4 p-3 bg-white rounded-md shadow-sm text-color-text leading-relaxed">
//               <strong>Размер:</strong> {bouquet.size}
//             </div>
//           )}

//           <div className="mb-6 w-full">
//             <OrderButton
//               popup
//               bouquetName={bouquet.name}
//               contextNameButton={contextButtonName}
//               watchField={watchField}
//             />
//           </div>

//           {bouquet.description && (
//             <div
//               id="modal-description"
//               className="mb-6 p-4 bg-white rounded-md shadow-sm text-color-text leading-relaxed"
//             >
//               <strong>Описание:</strong> {bouquet.description}
//             </div>
//           )}

//           <div>
//             <h3 className="text-xl font-semibold mb-3 text-color-text">
//               Связаться с нами:
//             </h3>

//             <div className="flex flex-col gap-3">
//               <a
//                 href="tel:+79656003600"
//                 className="block px-4 py-3 rounded-md font-semibold text-white bg-[#4dd0af] hover:opacity-90 transition-opacity"
//               >
//                 Позвонить: +7 (965) 600-3-600
//               </a>
//               <a
//                 href="https://wa.me/79270387435"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="block px-4 py-3 rounded-md font-semibold text-white bg-[#29A71A] hover:opacity-90 transition-opacity"
//               >
//                 Написать в WhatsApp
//               </a>
//               <a
//                 href="https://t.me/myata_flow"
//                 target="_blank"
//                 rel="noreferrer"
//                 className="block px-4 py-3 rounded-md font-semibold text-white bg-[#0088cc] hover:opacity-90 transition-opacity"
//               >
//                 Написать в Telegram
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>,
//     modalRoot
//   );
// };

// export default BouquetModal;