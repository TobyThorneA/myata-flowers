// // components/BouquetCardCompact/BouquetCardCompact.tsx

import { useAppDispatch, useAppSelector } from "@store/app/hook";
import OrderButton from "@components/orderButton/OrderButton";
import { toggleFavorite } from "@store/slices/favoritesSlice";
import HeartFavorite from "@assets/HeartFavorite.svg?react"
import type { IBouquet } from "@pages/admin/types";

type Props = {
  bouquet: IBouquet;
  onClick?: () => void;
  badge?: string;
};

const BouquetCardCompact = ({ bouquet, onClick, badge }: Props) => {
  const dispatch = useAppDispatch();
  const favorietsIds = useAppSelector(state => state.favoriets.favoriteIds);
  const isFavorite = favorietsIds.includes(bouquet._id);
  const oldPrice = bouquet.oldPrice ?? 0;
 
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(bouquet._id))
  }

  return (
    <div
      className="
        flex flex-col
        cursor-pointer 
        bg-colorPrimary 
        overflow-hidden 
        shadow-lg 
        rounded-xl
        transition-all
        duration-300
        ease-in-out
        hover:shadow-xl
        hover:scale-105
        focus:outline-none focus:ring-0
        select-none
      "
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden w-full aspect-square rounded-xl">
        <div className="w-full px-2 py-1 flex items-center justify-between absolute top-0 right-0 left-0 text-white text-base font-bold whitespace-nowrap z-10 bg-transparent">
          {badge ? (
            <div className="w-12 h-7 bg-green-500 rounded-full shadow-lg text-center flex items-center justify-center">
              {badge}
            </div>
          ) : (
            <div />  // Пустышка, чтобы сердечко осталась справа при отсутствии badge
          )}
          <button
            onClick={handleToggleFavorite}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <HeartFavorite
              className={`w-10 h-10 transition-colors ${
                isFavorite ? "fill-red-500" : "fill-white"
              }`}
            />
          </button>
        </div>



        <img
          src={bouquet.images?.[0] ?? "/placeholder.jpg"}
          alt={bouquet.name}
          className="block w-full h-full object-cover"
           loading="lazy"
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col flex-1 p-3 gap-1.5 text-center">
        <div
          className="
            text-base font-semibold text-[#333]
            overflow-hidden
            whitespace-nowrap
            text-ellipsis
          "
        >
          {bouquet.name}
        </div>

        {bouquet.description && (
          <div
            className="
              text-sm text-[#777] leading-snug
              overflow-hidden
              whitespace-nowrap
              text-ellipsis
            "
          >
            {bouquet.description.length > 50
              ? `${bouquet.description.substring(0, 50)}...`
              : bouquet.description}
          </div>
        )}

        <div className="flex justify-center items-center gap-1.5">
          <span className="text-base font-bold text-[#e91e63]">
            {bouquet.price} ₽
          </span>
          {oldPrice > bouquet.price && (
            <span className="text-sm text-[#aaa] line-through">
              {bouquet.oldPrice} ₽
            </span>
          )}
        </div>

        <div
          className="mt-auto"
          onClick={(e) => {
            e.stopPropagation()
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
  )
}

export default BouquetCardCompact;
