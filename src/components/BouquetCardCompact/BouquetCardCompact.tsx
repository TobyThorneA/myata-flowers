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
        bg-colorPrimary rounded-xl shadow-md
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
          <button onClick={handleToggleFavorite} className="p-1">
            <HeartFavorite
              className={`w-6 h-6 transition-colors ${
                isFavorite ? "fill-red-500" : "fill-white"
              }`}
            />
          </button>
        </div>

        <img
          src={bouquet.images?.[0] ?? "/placeholder.jpg"}
          alt={bouquet.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1 p-3 text-center gap-2">
        <div className="text-base font-semibold text-[#333] truncate">{bouquet.name}</div>

        {bouquet.description && (
          <div className="text-sm text-[#777] leading-tight truncate">
            {bouquet.description.length > 50
              ? `${bouquet.description.substring(0, 50)}...`
              : bouquet.description}
          </div>
        )}

        <div className="flex justify-center items-center gap-2 mt-1">
          <span className="text-base font-bold text-[#e91e63]">{bouquet.price} ₽</span>
          {oldPrice > bouquet.price && (
            <span className="text-sm text-[#aaa] line-through">{bouquet.oldPrice} ₽</span>
          )}
        </div>

        <div
          className="mt-auto"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <OrderButton
            popup
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

