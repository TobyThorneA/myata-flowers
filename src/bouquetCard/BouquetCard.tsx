// BouquetCard

import './bouquetCard.scss'

interface DataCard {
  name: string;
  photo: string;
  price: number;
  oldPrice:number;
  handleOpenModal: () => void;
}

const BouquetCard = ({name, photo, price, oldPrice, handleOpenModal}: DataCard) => {
  return (
    <div
      className="bouquet-card"
      onClick={handleOpenModal}
    >
        <img
          className="bouquet-card__photo"
          src={photo}
          alt={name}
          loading="lazy"
        />
      <div className="bouquet-card__info">
        <p className="bouquet-card__name-wrapper">
          <span className="bouquet-card__name">{name}</span>
        </p>
        
        <div className='bouquet-card__prices'>
          <p className="bouquet-card__old-price">
            {oldPrice} <span className="currency">₽</span>
          </p>
          <p className="bouquet-card__price">
            {price} <span className="currency">₽</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default BouquetCard