import type { IBouquet } from "@pages/admin/types"

interface SpecialOfferCardSquareProps {
  bouquet: IBouquet
  onViewBouquet: (b: IBouquet) => void | Promise<void>;
}

const SpecialOfferCardSquare: React.FC<SpecialOfferCardSquareProps> = ({ bouquet, onViewBouquet }) => {

  const handleViewBouquet = (bouquet: IBouquet) => {
    window.ym?.(102322325, "reachGoal", "bouquet_view", {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    onViewBouquet(bouquet);
  };

  return (
    <div className="bg-bg-card rounded-xl shadow p-2 md:p-4 flex flex-col h-full"
      onClick={() => handleViewBouquet(bouquet)}
    >
          <div className="w-full relative overflow-hidden rounded-lg pt-[130%] md:pt-0 md:flex-1">
            <img
              src={bouquet.images[0]}
              alt={bouquet.name}
              className="absolute top-0 left-0 w-full h-full object-cover md:relative md:w-full md:h-full pointer-events-none"
            />
          </div>
          <h3 className="text-lg md:text-xl font-semibold mt-2">
            {bouquet.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-color-action font-bold text-lg md:text-xl">
              {bouquet.price} ₽
            </span>
            {bouquet.oldPrice && (
              <span className="text-gray-400 line-through text-sm md:text-base">
                {bouquet.oldPrice} ₽
              </span>
            )}
          </div>
        </div>
  )
}
export default SpecialOfferCardSquare