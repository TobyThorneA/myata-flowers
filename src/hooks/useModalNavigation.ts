import { useLocation, useNavigate } from "react-router-dom";

export const useModalNavigation = (onClose?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  const handleClose = () => {
    if (onClose) return onClose();
    if (backgroundLocation) {
      return navigate(backgroundLocation.pathname + (backgroundLocation.search || ''), { replace: true });
    }
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length >= 2) {
      return navigate(`/${parts.slice(0, parts.length - 1).join('/')}`, { replace: true });
    }
    navigate('/', { replace: true });
  };

  return handleClose;
}
