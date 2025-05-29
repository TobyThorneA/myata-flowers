// BouquetCard

import './bouquetCard.scss'

interface DataCard {
  name: string;
  photo: string;
}

const BouquetCard = ({name, photo}: DataCard) => {
  return (
    <div
      className="bouquet-card"
    >
        <img
          className="bouquet-card__photo"
          src={photo}
          alt={name}
        />
        {/* <p className="bouquet-card__name">{name}</p> */}
        <p className="bouquet-card__name-wrapper">
          <span className="bouquet-card__name">{name}</span>
        </p>
    </div>
  )
}

export default BouquetCard