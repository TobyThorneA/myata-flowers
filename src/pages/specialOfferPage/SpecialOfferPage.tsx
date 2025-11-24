import { useAppSelector } from "@store/app/hook";
import { useNavigate } from "react-router-dom";

// Карты категорий (чисто названия)
const categories = [
  { id: "rosesmam", title: "Розы" },
  { id: "pionrosesmam", title: "Пионовидные Розы" },
  { id: "alstromam", title: "Альстромерия" },
  { id: "hrissmam", title: "Хризантемы" },
  { id: "sbornye", title: "Сборные" },
  { id: "avtorsky", title: "Авторские" },
  { id: "compositions", title: "Композиции" },
  { id: "Seasons", title: "Сезонные" },
];

const SpecialOfferPage = () => {
  const navigate = useNavigate();
  const bouquets = useAppSelector(state => state.bouquet.items);

  const handleClick = (id: string) => {
    navigate(`/specialOffer/${id}`);
  };

  // Функция берёт картинку первого букета этой категории
  const getCategoryImage = (catId: string) => {
    // Приводим строку в формат категории букетов
    const normalized = catId.replace(/-/g, " ");

    // ищем букеты с такой категорией
    const match = bouquets.find(b =>
      b.categories?.includes(normalized)
    );

    // если нашли → возвращаем первую фотку
    if (match && match.images && match.images.length > 0) {
      return match.images[0];
    }

    // если нет → fallback
    return "/images/categories/default.jpg";
  };

  return (
    <div className="mt-5 pb-16 px-4 md:px-8 md:mt-0 md:pt-3 bg-bg-collor">

      <h2 
      className="font-cursive font-normal pt-4 text-2xl md:text-5xl text-center mb-8 text-color-text"
      >
        Специальные предложения ко дню мамы 
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className="
              bg-bg-card rounded-xl shadow
              p-2 md:p-4 
              flex flex-col items-center 
              transition-transform duration-200
              active:scale-95 cursor-pointer
            "
          >

            {/* Картинка категории */}
            <div className="font-cursive w-full relative overflow-hidden rounded-lg pt-[75%]">
              <img
                src={getCategoryImage(cat.id)}
                alt={cat.title}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>

            <h3 className="font-cursive text-center text-md md:text-2xl font-semibold mt-3">
              {cat.title}
            </h3>

          </div>
        ))}

      </div>
    </div>
  );
};

export default SpecialOfferPage;
