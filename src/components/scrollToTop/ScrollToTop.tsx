import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Получаем только первую часть пути
function getBasePath(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  // Если нет сегментов — главная
  if (segments.length === 0) return "/";

  // Если первый сегмент НЕ совпадает с именами корневых страниц, считаем модалкой на главной
  const knownRoots = ["catalog", "promo", "favorites", "store", "order", "about", "contacts", "delivery", "payment", "warranty", "1"];
  if (!knownRoots.includes(segments[0])) return "/";

  return `/${segments[0]}`;
}

const ScrollToTop = () => {
  const location = useLocation();
  const previousBasePath = useRef(getBasePath(location.pathname));
  const previousLocation = useRef(location);
  

  

  useEffect(() => {
    const isModal = !!location.state?.backgroundLocation;
    const currentBasePath = getBasePath(location.pathname);
    const isRealPageChange = previousBasePath.current !== currentBasePath;

    if (isRealPageChange && !isModal) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }


    previousBasePath.current = currentBasePath;
    previousLocation.current = location;
  }, [location]);

  return null;
};

export default ScrollToTop;



