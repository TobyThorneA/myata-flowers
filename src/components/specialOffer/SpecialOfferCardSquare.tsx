import type { IBouquet } from "@pages/admin/types";

interface SpecialOfferCardSquareProps {
  bouquet: IBouquet;
  onViewBouquet: (b: IBouquet) => void | Promise<void>;
}

const SpecialOfferCardSquare: React.FC<SpecialOfferCardSquareProps> = ({
  bouquet,
  onViewBouquet,
}) => {
  const handleViewBouquet = (bouquet: IBouquet) => {
    window.ym?.(102322325, "reachGoal", "bouquet_view", {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    onViewBouquet(bouquet);
  };

  return (
    <div
      className="flex h-full flex-col rounded-xl bg-bg-card p-2 shadow md:p-4"
      onClick={() => handleViewBouquet(bouquet)}
    >
      <div className="relative w-full overflow-hidden rounded-lg pt-[130%] md:flex-1 md:pt-0">
        <img
          src={bouquet.images[0]}
          alt={bouquet.name}
          className="pointer-events-none absolute left-0 top-0 h-full w-full object-cover md:relative md:h-full md:w-full"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold md:text-xl">{bouquet.name}</h3>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-lg font-bold text-color-action md:text-xl">{bouquet.price} ₽</span>
        {bouquet.oldPrice && (
          <span className="text-sm text-gray-400 line-through md:text-base">
            {bouquet.oldPrice} ₽
          </span>
        )}
      </div>
    </div>
  );
};
export default SpecialOfferCardSquare;
