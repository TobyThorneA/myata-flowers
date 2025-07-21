// BouquetGrid.tsx

import type { IBouquet } from "@pages/admin/types";
import BouquetCardCompact from "@components/BouquetCardCompact/BouquetCardCompact";

type BouquetsGridProps = {
  title?: string;
  bouquets: IBouquet[];
  onViewBouquet: (b: IBouquet) => void | Promise<void>;
  className: string;
  shortDescription: string;
  showSeeMoreCard?: boolean;
  onSeeMoreClick?: () => void
};

const BouquetsGrid = ({ title = "Каталог букетов", bouquets, onViewBouquet, className, shortDescription, showSeeMoreCard, onSeeMoreClick }: BouquetsGridProps) => {

  const handleViewBouquet = (bouquet: IBouquet) => {
    window.ym?.(102322325, "reachGoal", "bouquet_view", {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    onViewBouquet(bouquet);
  };

  return (
    <div className={className}>
      <h1 className="text-2xl font-semibold text-center mb-4">{title}</h1>
      <p className="text-color-icons mt-1 text-base text-center md:text-lg">{shortDescription}</p>
      <div className=" w-20 h-1 bg-color-action mx-auto mt-3 mb-5 rounded-full" />

      <div
        className="
          grid grid-cols-2 gap-3 md:gap-4 md:mx-3
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
        "
      >

        {bouquets.map((bouquet, index) => {
          const isLast = index === bouquets.length - 1;
          const shouldShowCTA = showSeeMoreCard && isLast;

          if (shouldShowCTA) {
            return (
              <div
                key={bouquet._id}
                className="md:w-[290px] relative cursor-pointer"
                onClick={onSeeMoreClick}
              >
                <BouquetCardCompact
                  bouquet={bouquet}
                  onClick={() => handleViewBouquet(bouquet)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
                  <span className="text-white text-lg font-semibold">Больше букетов</span>
                </div>
              </div>
            );
          }

          return (
            <div key={bouquet._id} className="md:w-[290px]">
              <BouquetCardCompact
                bouquet={bouquet}
                onClick={() => handleViewBouquet(bouquet)}
              />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default BouquetsGrid;


