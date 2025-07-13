// BouquetGrid.tsx

import { type Bouquet } from "../../mocks/productsData";
import BouquetCardCompact from "@components/BouquetCardCompact/BouquetCardCompact";

type BouquetsGridProps = {
  title?: string;
  bouquets: Bouquet[];
  onViewBouquet: (b: Bouquet) => void | Promise<void>;
  className: string
  shortDescription: string
};

const BouquetsGrid = ({ title = "Каталог букетов", bouquets, onViewBouquet, className, shortDescription }: BouquetsGridProps) => {

  const handleViewBouquet = (bouquet: Bouquet) => {
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
          grid grid-cols-2 gap-3 md:gap-4
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4
        "
      >
        {bouquets.map((bouquet) => (
          <BouquetCardCompact
            key={bouquet._id}
            bouquet={bouquet}
            onClick={() => handleViewBouquet(bouquet)}
          />
        ))}
      </div>
    </div>
  );
};

export default BouquetsGrid;


