import { useNavigate, useParams, useLocation } from "react-router-dom";
import BouquetModal from "../../components/bouquetModal/BouquetModal";
import { useAppSelector } from "@store/app/hook";
import axios from "axios";
import { useEffect, useState } from "react";
import type { IBouquet } from "@pages/admin/types";

interface LocationState {
  backgroundLocation?: { pathname: string };
}

const BouquetPage = () => {
  const { bouquetId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = (location.state as LocationState)?.backgroundLocation;

  const bouquets = useAppSelector(state => state.bouquet.items);
  const [bouquet, setBouquet] = useState<IBouquet | null>(
    bouquets.find(b => b._id === bouquetId) || null
  );

  useEffect(() => {
    if (!bouquetId || bouquet) return;

    axios.get(`/api/bouquets/${bouquetId}`)
      .then(res => setBouquet(res.data))
      .catch(() => setBouquet(null));
  }, [bouquetId, bouquet]);

  const handleClose = () => {
    if (backgroundLocation) {
      navigate(backgroundLocation.pathname);
    } else {
      navigate('/', { replace: true });
    }
  };

  if (!bouquet) return <div>Букет не найден</div>;

  const isModal = !!backgroundLocation;

  const content = (
    <BouquetModal
      bouquet={bouquet}
      onClose={handleClose}
    />
  );

  return isModal ? content : (
    <div className="full-page-wrapper">
      {content}
    </div>
  );
};

export default BouquetPage;


// // BouquetPage
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import BouquetModal from "../../components/bouquetModal/BouquetModal";
// import { useAppSelector } from "@store/app/hook";

// interface LocationState {
//   backgroundLocation?: { pathname: string };
// }

// const BouquetModalPage = () => {
//   const { bouquetId } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const bouquets = useAppSelector(state => state.bouquet.items)
//   const bouquet = bouquets.find(b => b._id === bouquetId);
//   const backgroundLocation = (location.state as LocationState)?.backgroundLocation;

//     const handleClose = () => {
//     if (backgroundLocation) {
//       navigate(backgroundLocation.pathname);
//     } else {
//       navigate('/', { replace: true });
//     }
//   };
  
//   if (!bouquet) return <div>Букет не найден</div>;

//   const isModal = !!location.state?.backgroundLocation;

//   const content = (
//   <BouquetModal
//     bouquet={bouquet}
//     onClose={() => handleClose()}
//   />
// );

//     return isModal ? content : (
//     <div className="full-page-wrapper">
//       {content}
//     </div>
//   );
// };

// export default BouquetModalPage;
