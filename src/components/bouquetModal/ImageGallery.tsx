import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { toggleFavorite } from "@store/slices/favoritesSlice";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import HeartFavorite from "@assets/HeartFavorite.svg?react";

type PhotosProps = {
  id: string | undefined}

const ImageGallery  = ({id} : PhotosProps ) => {

  const dispatch = useAppDispatch()
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const bouquets = useAppSelector((state) => state.bouquet.items);
  const bouquet = bouquets.find((b) => b._id === id);
  
  const favorietsIds = useAppSelector((state) => state.favoriets.favoriteIds);
  const isFavorite = bouquet ? favorietsIds.includes(bouquet._id) : false;



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

    const handleToggleFavorite = (e: React.MouseEvent) => {
      e.stopPropagation();
      if(!bouquet) return
      dispatch(toggleFavorite(bouquet._id));
    };
  
    const swipeHandlers = useSwipeable({
      onSwipedLeft: nextPhoto,
      onSwipedRight: prevPhoto,
      preventScrollOnSwipe: true,
      // trackMouse: true, // если хочешь свайпы мышкой
    });

    if(!bouquet) return

  return (
    <div className="flex-1 p-4 md:p-6 flex flex-col min-w-[280px]">
      <div
        {...swipeHandlers}
        className="relative w-full max-h-[80vh] overflow-hidden rounded-xl flex justify-center items-center"
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
              className="relative flex-shrink-0 w-full flex justify-center items-center px-2"
            >
              {/* кнопка добавить в избранное */}
              <button onClick={handleToggleFavorite} className="p-1 absolute top-3 right-5 md:top-5 md:right-14 ">
                <HeartFavorite
                  className={`w-10 h-10 md:w-14 md:h-14 transition-colors  ${
                    isFavorite ? "fill-red-500" : "fill-white"
                  }`}
                />
              </button>
              {/* изображения */}
              <img
                src={img}
                alt={`Фото ${i + 1}`}
                loading="lazy"
                className="w-full max-h-[80vh] object-contain rounded-xl"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
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

          <div className="flex flex-wrap gap-3 mt-4 p-1 justify-center overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-color-icons">
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
  )
}
export default ImageGallery