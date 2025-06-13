// BouquetPage
import { useNavigate, useParams } from "react-router-dom";
import { bouquets } from "../mocks/productsData";
import BouquetModal from "../bouquetModal/BouquetModal";

const BouquetModalPage = () => {
  const { bouquetId } = useParams();
  const navigate = useNavigate();
  const bouquet = bouquets.find(b => b._id === bouquetId);
  
  if (!bouquet) return null;
  return (
    <BouquetModal
      bouquet={bouquet}
      onClose={() => navigate(-1)} // Назад, на background location
    />
  );
};

export default BouquetModalPage;
