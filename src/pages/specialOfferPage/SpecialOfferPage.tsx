import { useAppSelector } from "@store/app/hook";
import { useNavigate } from "react-router-dom";

import { SPECIAL_OFFERS_CATEGORIES } from "../../shared/categories/config/specialOffersCategories";

// Карты категорий (чисто названия)
// const categories = [
//   { id: "rosemom", title: "Розы" },
//   { id: "pionmom", title: "Кустовые Розы" },
//   { id: "hrissmam", title: "Хризантемы" },
//   { id: "mixmom", title: "Сборные" },
//   { id: "staymom", title: "Стойкие" },
//   { id: "gigamom", title: "Гиганты" },
//   { id: "boxmom", title: "Композиции" },
//   { id: "avtor", title: "Авторские" },
// ];

const SpecialOfferPage = () => {
  const navigate = useNavigate();
  const bouquets = useAppSelector((state) => state.bouquet.items);

  const handleClick = (id: string) => {
    navigate(`/specialOffer/${id}`);
  };

  // Функция берёт картинку первого букета этой категории
  const getCategoryImage = (catId: string) => {
    // Приводим строку в формат категории букетов
    const normalized = catId.replace(/-/g, " ");

    // ищем букеты с такой категорией
    const match = bouquets.find((b) => b.categories?.includes(normalized));

    // если нашли → возвращаем первую фотку
    if (match && match.images && match.images.length > 0) {
      return match.images[0];
    }

    // если нет → fallback
    return "/images/categories/default.jpg";
  };

  return (
    <div className="mt-5 bg-bg-collor px-4 pb-16 md:mt-0 md:px-8 md:pt-3">
      <h2 className="mb-8 pt-4 text-center font-cursive text-2xl font-normal text-color-text md:text-5xl">
        Специальные предложения
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {SPECIAL_OFFERS_CATEGORIES.map((cat) => (
          // {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className="flex cursor-pointer flex-col items-center rounded-xl bg-bg-card p-2 shadow transition-transform duration-200 active:scale-95 md:p-4"
          >
            {/* Картинка категории */}
            <div className="relative w-full overflow-hidden rounded-lg pt-[75%] font-cursive">
              <img
                src={getCategoryImage(cat.id)}
                alt={cat.title}
                className="absolute left-0 top-0 h-full w-full object-cover"
              />
            </div>

            <h3 className="text-md mt-3 text-center font-cursive font-semibold md:text-2xl">
              {cat.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialOfferPage;
