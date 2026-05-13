//components/BouquetCardCompact/BouquetCardCompact.tsx
import HeartFavorite from "@assets/HeartFavorite.svg?react";
import OrderButton from "@components/orderButton/OrderButton";
import type { IBouquet } from "@pages/admin/types";
import { useAppDispatch, useAppSelector } from "@store/app/hook";
import { toggleFavorite } from "@store/slices/favoritesSlice";

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
      className="flex h-full cursor-pointer select-none flex-col rounded-xl bg-bg-card shadow-md transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{ WebkitTapHighlightColor: "transparent" }}
      onClick={onClick}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-t-xl">
        <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-2 py-1">
          {badge ? (
            <div className="flex h-6 w-10 items-center justify-center rounded-full bg-green-500 text-xs text-white shadow-md">
              {badge}
            </div>
          ) : (
            <div />
          )}
          {bouquet.available ? (
            ""
          ) : (
            <p className="absolute ml-1 mt-1 rounded bg-white bg-opacity-70 px-2 py-1 text-xs font-semibold text-color-action">
              под заказ ⏳
            </p>
          )}
          <button onClick={handleToggleFavorite} className="p-1">
            <HeartFavorite
              className={`mr-0.5 mt-1 h-6 w-6 transition-colors ${
                isFavorite ? "fill-red-500" : "fill-white"
              }`}
            />
          </button>
        </div>

        <img
          src={bouquet.images?.[0] ?? "/placeholder.jpg"}
          alt={bouquet.name}
          className="h-full w-full rounded-2xl object-cover p-2"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3 text-center">
        <div className="text-md truncate font-cursive font-semibold text-color-text md:text-2xl">
          {bouquet.name}
        </div>

        <div className="text-md flex items-center justify-center gap-2 font-cursive font-semibold md:text-sm">
          <span className="text-xl text-color-action md:text-2xl">{bouquet.price} ₽</span>
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
          <OrderButton bouquetName={bouquet.name} contextNameButton="Заказать" watchField />
        </div>
      </div>
    </div>
  );
};

export default BouquetCardCompact;
