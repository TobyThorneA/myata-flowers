//components/BouquetCardCompact/BouquetCardCompact.tsx
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import OrderButton from "@components/orderButton/OrderButton";
import { toggleFavorite } from "@store/slices/favoritesSlice";
import HeartFavorite from "@assets/HeartFavorite.svg?react";
import type { IBouquet } from "@pages/admin/types";

type Props = {
  bouquet: IBouquet;
  onClick?: () => void;
  badge?: string;
};

const BouquetCardCompact = ({ bouquet, onClick, badge }: Props) => {
  const dispatch = useAppDispatch();
  const favorietsIds = useAppSelector((state) => state.favoriets.favoriteIds);
  const isFavorite = favorietsIds.includes(bouquet._id);
  const oldPrice = bouquet.oldPrice ?? 0;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(bouquet._id));
  };

  return (
    <div
      className="
        flex flex-col h-full
        bg-bg-card rounded-xl shadow-md
        hover:shadow-lg hover:scale-[1.02]
        transition-transform duration-200
        cursor-pointer select-none
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={onClick}
    >
      <div className="relative w-full aspect-square rounded-t-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 px-2 py-1 flex justify-between items-center z-10">
          {badge ? (
            <div className="w-10 h-6 bg-green-500 rounded-full text-white text-xs flex items-center justify-center shadow-md">
              {badge}
            </div>
          ) : (
            <div />
          )}
          {bouquet.available 
          ? ''
          : (
            <p className="text-xs absolute bg-white bg-opacity-70 px-2 py-1 ml-1 mt-1  rounded text-sm font-semibold text-color-action">под заказ ⏳</p>
          )}
          <button onClick={handleToggleFavorite} className="p-1">
            <HeartFavorite
              className={`w-6 h-6 mt-1 mr-0.5 transition-colors ${
                isFavorite ? "fill-red-500" : "fill-white" 
              }`}
            />
          </button>
        </div>

        <img
          src={bouquet.images?.[0] ?? "/placeholder.jpg"}
          alt={bouquet.name}
          className="p-2 rounded-2xl w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 text-center gap-2">
        <div className="font-cursive font-semibold text-md md:text-2xl text-color-text truncate">{bouquet.name}</div>

        <div className="font-cursive font-semibold text-md md:text-sm flex justify-center items-center gap-2 ">
          <span className="text-xl md:text-2xl text-color-action">{bouquet.price} ₽</span>
          {oldPrice > bouquet.price && (
            <span className="text-[#aaa] line-through">{bouquet.oldPrice} ₽</span>
          )}
        </div>

        <div
          className="mt-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <OrderButton
            bouquetName={bouquet.name}
            contextNameButton="Заказать"
            watchField
          />
        </div>
      </div>
    </div>
  );
};

export default BouquetCardCompact;

