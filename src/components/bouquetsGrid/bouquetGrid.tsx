//BouquetGrid.tsx
import type { IBouquet } from "@pages/admin/types";
import BouquetCardCompact from "@components/BouquetCardCompact/BouquetCardCompact";
import LastCard from "@components/lastCard/LastCard";

type BouquetsGridProps = {
  title?: string;
  bouquets: IBouquet[];
  onViewBouquet: (b: IBouquet) => void | Promise<void>;
  className?: string;
  shortDescription: string;
  showSeeMoreCard?: boolean;
  onSeeMoreClick?: () => void;
};

const BouquetsGrid = ({
  title = "Каталог букетов",
  bouquets,
  onViewBouquet,
  className = "",
  shortDescription,
  showSeeMoreCard,
  onSeeMoreClick,
}: BouquetsGridProps) => {
  const handleViewBouquet = (bouquet: IBouquet) => {
    window.ym?.(102322325, "reachGoal", "bouquet_view", {
      bouquetId: bouquet._id,
      bouquetName: bouquet.name,
    });
    onViewBouquet(bouquet);
  };

  if(showSeeMoreCard && bouquets.length === 9) {
    bouquets.push({_id: 'see-more'} as IBouquet)
  }

  return (
    <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
      <h1 className="text-2xl font-semibold text-center mb-2">{title}</h1>
      <p className="text-color-icons mt-1 text-base text-center md:text-lg">{shortDescription}</p>
      <div className="w-20 h-1 bg-color-action mx-auto mt-3 mb-6 rounded-full" />

      <div
        className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-5
        "
      >
        {bouquets.map((bouquet) => {

          if(bouquet._id === 'see-more'){
            return <LastCard key={bouquet._id}  nameNav={onSeeMoreClick}/>
          }

          return (
            <div key={bouquet._id} className="w-full h-full">
              <div
              >
                <BouquetCardCompact
                  bouquet={bouquet}
                  onClick={() => handleViewBouquet(bouquet)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BouquetsGrid;

