import { reachGoal } from "@lib/metrika";
import { type Location, useLocation, useNavigate } from "react-router-dom";

interface OrderButtonProps {
  bouquetName?: string;
  contextNameButton?: string;
  watchField?: boolean;
}

type OrderButtonLocationState = {
  backgroundLocation?: Location;
};

const OrderButton = ({
  bouquetName,
  contextNameButton = "Подобрать букет",
  watchField = false,
}: OrderButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as OrderButtonLocationState | null;

  const backgroundLocation = locationState?.backgroundLocation;

  const handleClick = () => {
    reachGoal("click_order_button", { bouquetName });
    const scrollY = window.scrollY;
    navigate("/order", {
      state: {
        backgroundLocation,
        bouquetName,
        watchField,
        scrollY,
        modalUrl: location.pathname, // URL самой модалки
      },
    });
  };

  return (
    <button
      onClick={handleClick}
      className="w-full max-w-[500px] rounded-lg bg-gradient-to-br from-[#67A799] to-[#174142] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-[2px] hover:from-[#174142] hover:to-[#67A799] hover:shadow-lg active:translate-y-0 md:text-base"
    >
      {contextNameButton}
    </button>
  );
};

export default OrderButton;
