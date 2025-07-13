import BouquetsGrid from "@components/bouquetsGrid/bouquetGrid";
import Carusel from "@components/carousel/Carusel";
import DeliveryDicoration from "@components/delivery-and-dicoration/DeliveryDicoration";
import OrderCTA from "@components/orderCTA/OrderCTA";
import ProductDescription from "@components/productDescription/ProductDescription";
import Reviwes from "@components/reviews/Reviews";
import { useAppSelector } from "@store/app/hook";
import { useLocation, useNavigate } from "react-router-dom";

//популярное, специальные предложения, сезонные предложения, Розы, Хризантемы, Авторские букеты, Композиции, Подарочные наборы
// const TITLE_NAMES_BOUQUETS = ['специальные предложения', 'сезонные предложения', 'Розы', 'Хризантемы', 'Композиции']

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bouquetsSpecial = useAppSelector(state => state.bouquets.items.slice(0, 8));
  const seasonalOffers = useAppSelector(state => state.bouquets.items.slice(8, 16));
  const roses = useAppSelector(state => state.bouquets.items.slice(16, 24));
  const chrysanthemums = useAppSelector(state => state.bouquets.items.slice(24, 32));
  const flowerArrangements = useAppSelector(state => state.bouquets.items.slice(32, 36));

  const bouquetsByCategory = [
    {
      categoryName: 'специальные предложения',
      bouquets: bouquetsSpecial,
      shortDescription: 'Приятные цены, скидки на доставку до 100% ✨',
    },
    {
      categoryName: 'сезонные предложения',
      bouquets: seasonalOffers,
      shortDescription: 'Сезонные цвета, большое количесвто приятные цены 💐',
    },
    {
      categoryName: 'Розы',
      bouquets: roses,
      shortDescription: 'Классика и не только на любой вкус 🌹',
    },
    {
      categoryName: 'Хризантемы',
      bouquets: chrysanthemums,
      shortDescription: 'Объемные, красивые стойкие 🌼',
    },
    {
      categoryName: 'Композиции',
      bouquets: flowerArrangements,
      shortDescription: 'Цветы в шляпных коробках и корзинах 🌷',
    },
  ]

  return (
    <div className="pt-12 md:pt-0">
      <Carusel />
        <OrderCTA
          title={'Незнаете какой букет выбрать?'}
          CTA={'Оставьть заявку, мы свяжемся с вами в течении 10 минут и подберем тот букет который нужен именно Вам'}
        />
      {bouquetsByCategory.map(bouquetCategory => (
        <BouquetsGrid 
          key={bouquetCategory.categoryName}
          title={bouquetCategory.categoryName}
          bouquets={bouquetCategory.bouquets}
          shortDescription={bouquetCategory.shortDescription}
          onViewBouquet={(b) => navigate(`/${b._id}`, { state: { backgroundLocation: location } })}
          className={"px-4 my-10 md:mt-0"}
        />
      ))}
      <ProductDescription />
      <DeliveryDicoration />
      <Reviwes />
      <OrderCTA 
        title={'Ничего не нашли?'}
        CTA={'Оставьть заявку, мы свяжемся с вами в течении 10 минут и подберем тот букет который нужен именно вам'}
      />
    </div>
  );
};

export default MainPage;