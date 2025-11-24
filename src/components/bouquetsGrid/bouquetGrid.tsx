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
  
  if(showSeeMoreCard && bouquets.length === 9) {
    bouquets.push({_id: 'see-more'} as IBouquet)
  }
  
  return (
    <div className={`${className}`}>
      <h1 className="font-cursive text-4xl text-center mb-2 px-4 md:px-0">
        {title}
      </h1>

      <p className="text-color-icons text-sm mt-1 text-base text-center md:text-lg px-4 md:px-0">
        {shortDescription}
      </p>

      <div className="w-20 h-1 bg-color-action mx-auto mt-3 mb-6 rounded-full" />

      {/* --- фон, который должен идти до краёв --- */}
      <div className="bg-bg-collor w-full px-0 md:px-8 py-6">

        <div
          className="
            grid gap-4
            grid-cols-2
            sm:grid-cols-3
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-5
            px-4 md:px-0
          "
        >
          {bouquets.map(bouquet => {
            if (bouquet._id === "see-more") {
              return (
                <LastCard key={bouquet._id} nameNav={onSeeMoreClick} />
              );
            }

            return (
              <BouquetCardCompact
                key={bouquet._id}
                bouquet={bouquet}
                onClick={() => onViewBouquet(bouquet)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BouquetsGrid;


// type BouquetsGridProps = {
//   title?: string;
//   bouquets: IBouquet[];
//   onViewBouquet: (b: IBouquet) => void | Promise<void>;
//   className?: string;
//   shortDescription: string;
//   showSeeMoreCard?: boolean;
//   onSeeMoreClick?: () => void;
// };

// const BouquetsGrid = ({
//   title = "Каталог букетов",
//   bouquets,
//   onViewBouquet,
//   className = "",
//   shortDescription,
//   showSeeMoreCard,
//   onSeeMoreClick,
// }: BouquetsGridProps) => {
//   const handleViewBouquet = (bouquet: IBouquet) => {
//     window.ym?.(102322325, "reachGoal", "bouquet_view", {
//       bouquetId: bouquet._id,
//       bouquetName: bouquet.name,
//     });
//     onViewBouquet(bouquet);
//   };

  // if(showSeeMoreCard && bouquets.length === 9) {
  //   bouquets.push({_id: 'see-more'} as IBouquet)
  // }

//   return (
//     // <div className={` px-4 sm:px-6 lg:px-8 ${className}`}>
//     //   <h1 className="font-cursive text-4xl text-center mb-2">{title}</h1>
//     //   <p className="text-color-icons text-sm mt-1 text-base text-center md:text-lg">{shortDescription}</p>
//     //   <div className="w-20 h-1 bg-color-action mx-auto mt-3 mb-6 rounded-full" />

//     //   <div
//     //     className="
//     //       bg-red-500
//     //       grid gap-4
//     //       grid-cols-2
//     //       sm:grid-cols-3
//     //       md:grid-cols-3
//     //       lg:grid-cols-4
//     //       xl:grid-cols-5
//     //       2xl:grid-cols-5
//     //     "
//     //   >
//     //     {bouquets.map((bouquet) => {

//     //       if(bouquet._id === 'see-more'){
//     //         return <LastCard key={bouquet._id}  nameNav={onSeeMoreClick}/>
//     //       }

//     //       return (
//     //         <div key={bouquet._id} className="w-full h-full">
//     //           <div
//     //           >
//     //             <BouquetCardCompact
//     //               bouquet={bouquet}
//     //               onClick={() => handleViewBouquet(bouquet)}
//     //             />
//     //           </div>
//     //         </div>
//     //       );
//     //     })}
//     //   </div>
//     // </div>
//     <div className={`px-4 sm:px-6 lg:px-8 ${className}`}>
//       <h1 className="font-cursive text-4xl text-center mb-2">{title}</h1>
//       <p className="text-color-icons text-sm mt-1 text-base text-center md:text-lg">
//         {shortDescription}
//       </p>
//       <div className="w-20 h-1 bg-color-action mx-auto mt-3 mb-6 rounded-full" />

//       {/* --- ОБОЛОЧКА ДЛЯ ФОНА КАК НА SpecialOfferPage --- */}
//       <div className="mt-2 pb-10 px-0 md:px-8 bg-bg-collor">

//         <div
//           className="
//             grid gap-4
//             grid-cols-2
//             sm:grid-cols-3
//             md:grid-cols-3
//             lg:grid-cols-4
//             xl:grid-cols-5
//             2xl:grid-cols-5
//             px-4 md:px-0
//           "
//         >
//           {bouquets.map((bouquet) => {

//             if (bouquet._id === 'see-more') {
//               return <LastCard key={bouquet._id} nameNav={onSeeMoreClick} />
//             }

//             return (
//               <div key={bouquet._id} className="w-full h-full">
//                 <BouquetCardCompact
//                   bouquet={bouquet}
//                   onClick={() => handleViewBouquet(bouquet)}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BouquetsGrid;

