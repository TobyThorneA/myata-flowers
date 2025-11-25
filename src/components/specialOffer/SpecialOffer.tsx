import OrderButton from "@components/orderButton/OrderButton";
import { useAppSelector } from "@store/app/hook";
import SpecialOfferCardRectangle from "./SpecialOfferCardRectangle";
import SpecialOfferCardSquare from "./SpecialOfferCardSquare";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const categoryNames: Record<string, string> = {
  rosemom: "Розы",
  pionmom: "Кустовые Розы",
  hrissmam: "Хризантемы",
  mixmom: "Сборные",
  staymom: "Стойкие",
  gigamom: "Гиганты",
  boxmom: "Композиции",
  avtor: "Авторские",
  // добавляешь свои
};

const SpecialOffer = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const allBouquets = useAppSelector(state => state.bouquet.items);
  if (!allBouquets) return null;

  const normalizedCategory = category?.replace(/-/g, " ") ?? " "

  const readableCategory = categoryNames[category ?? ""] ?? "";

    const bouquets = allBouquets
    .filter(b => b.categories?.includes(normalizedCategory))

    const sorted = [...bouquets].sort((a, b) => a.price - b.price)
    
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

  return (
    <div className="mt-16 pb-16 px-4 md:mt-0 md:px-8 bg-bg-collor font-cursive">
      {/* Заголовок акции */}
      <h2 className="font-cursive font-normal pt-4 text-2xl md:text-5xl text-center mb-8 text-color-text">
        Специальное предложение на день Мамы
        {readableCategory && ` (${readableCategory})`}
      </h2>

      {/* Сетка с букетами */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:items-stretch">

        {sorted.map((bouquet, i) => 
          i < 2 ? (
            <SpecialOfferCardSquare key={bouquet._id} bouquet={bouquet} onViewBouquet={(b) => navigate(`/bouquet/${b._id}`, { state: { backgroundLocation: location } })}/>
          ) : (
            <SpecialOfferCardRectangle key={bouquet._id} bouquet={bouquet} onViewBouquet={(b) => navigate(`/bouquet/${b._id}`, { state: { backgroundLocation: location } })}/>
          )
        )}

      </div>
      <div className="font-main  flex flex-col justify-center items-center mt-5">
        <p className="text-center text-xs md:text-md mb-5">Не знаете, что выбрать? Просто оставьте заявку! Мы свяжемся с вами и поможем подобрать идеальный букет для Вас 😉</p>
        <OrderButton />
      </div>
    </div>
  );
};

export default SpecialOffer;
