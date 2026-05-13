import HeartFavorite from "@assets/HeartFavorite.svg?react";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { toggleFavorite } from "@store/slices/favoritesSlice";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

type PhotosProps = {
  id: string | undefined;
};

const ImageGallery = ({ id }: PhotosProps) => {
  const dispatch = useAppDispatch();
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const bouquets = useAppSelector((state) => state.bouquet.items);
  const bouquet = bouquets.find((b) => b._id === id);

  const favorietsIds = useAppSelector((state) => state.favoriets.favoriteIds);
  const isFavorite = bouquet ? favorietsIds.includes(bouquet._id) : false;

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      bouquet && bouquet.images ? (prev === bouquet.images.length - 1 ? 0 : prev + 1) : prev,
    );
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) =>
      bouquet && bouquet.images ? (prev === 0 ? bouquet.images.length - 1 : prev - 1) : prev,
    );
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!bouquet) return;
    dispatch(toggleFavorite(bouquet._id));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextPhoto,
    onSwipedRight: prevPhoto,
    preventScrollOnSwipe: true,
    // trackMouse: true, // если хочешь свайпы мышкой
  });

  if (!bouquet) return;

  return (
    <div className="flex min-w-[280px] flex-1 flex-col p-4 md:p-6">
      <div
        {...swipeHandlers}
        className="relative flex max-h-[80vh] w-full items-center justify-center overflow-hidden rounded-xl"
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentPhotoIndex * 100}%)`,
            width: `${bouquet.images.length * 100}%`,
            maxHeight: "none",
          }}
        >
          {bouquet.images.map((img, i) => (
            <div
              key={i}
              className="relative flex w-full flex-shrink-0 items-center justify-center px-2"
            >
              {/* кнопка добавить в избранное */}
              <button
                onClick={handleToggleFavorite}
                className="absolute right-5 top-3 p-1 md:right-14 md:top-5"
              >
                <HeartFavorite
                  className={`h-10 w-10 transition-colors md:h-14 md:w-14 ${
                    isFavorite ? "fill-red-500" : "fill-white"
                  }`}
                />
              </button>
              {/* изображения */}
              <img
                src={img}
                alt={`Фото ${i + 1}`}
                loading="lazy"
                className="max-h-[80vh] w-full rounded-xl object-contain"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
      {bouquet.images.length > 1 && (
        <>
          <div className="mt-4 flex select-none items-center justify-center gap-4">
            <button
              onClick={prevPhoto}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-color-icons text-white shadow transition-colors hover:bg-color-action"
              aria-label="Предыдущее фото"
            >
              ‹
            </button>
            <div className="font-semibold text-color-text">
              {currentPhotoIndex + 1} / {bouquet.images.length}
            </div>
            <button
              onClick={nextPhoto}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-color-icons text-white shadow transition-colors hover:bg-color-action"
              aria-label="Следующее фото"
            >
              ›
            </button>
          </div>

          <div className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-color-icons mt-4 flex flex-wrap justify-center gap-3 overflow-x-auto p-1">
            {bouquet.images.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Вариант ${index + 1}`}
                loading="lazy"
                onClick={() => setCurrentPhotoIndex(index)}
                className={`h-16 w-16 cursor-pointer rounded-md object-cover transition-shadow duration-200 ${
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
  );
};
export default ImageGallery;
