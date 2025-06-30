import { useAppSelector } from "@store/app/hook";
import "./catalog.scss"
import Header from "@components/header/Header";
import OrderButton from "@components/orderButton/OrderButton";
import { useState } from "react";
import BouquetModal from "@components/bouquetModal/BouquetModal";
import { type Bouquet } from "../../mocks/productsData"

const Catalog = () => {

  const bouquets = useAppSelector(store => store.bouquets.items)
  const [selectedBouquet, setSelectedBouquet] = useState<null | typeof bouquets[0]>(null);
  const openModal = (bouquet: Bouquet) => setSelectedBouquet(bouquet);
  const closeModal = () => setSelectedBouquet(null);

    return (
      <>
        <Header />
       <div className="catalog">
      <h1 className="catalog__title">Каталог букетов</h1>
      <div className="catalog__grid">
        {bouquets?.map(bouquet => (
          <div className="catalog__item" key={bouquet._id} onClick={() => console.log('click')}>
            <div
              className="catalog__click-area"
              onClick={() => openModal(bouquet)}
            >
              <img
                src={bouquet.images[0]}
                alt={bouquet.name}
                className="catalog__image"
              />
            </div>
            <div className="catalog__info">
              <div className="catalog__name">{bouquet.name}</div>
              <div className="catalog__prices">
                <span className="catalog__price">{bouquet.price} ₽</span>
                {bouquet.oldprice > bouquet.price && (
                  <span className="catalog__oldprice">{bouquet.oldprice} ₽</span>
                )}
              </div>
              <div className="catalog__btn-wrapper">
                <OrderButton
                  popup
                  bouquetName={bouquet.name}
                  contextNameButton="Заказать букет"
                  watchField
                />
              </div>
            </div>
          </div>
        ))}
                    {selectedBouquet && (
              <BouquetModal bouquet={selectedBouquet} onClose={closeModal} />
            )}
      </div>
    </div>
      </>
  )
};

export default Catalog;