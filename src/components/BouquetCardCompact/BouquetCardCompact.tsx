// components/BouquetCardCompact/BouquetCardCompact.tsx

import "./BouquetCardCompact.scss";
import { type Bouquet } from "../../mocks/productsData";
import OrderButton from "@components/orderButton/OrderButton";

type Props = {
  bouquet: Bouquet;
  onClick?: () => void;
  badge?: string;
};

const BouquetCardCompact = ({ bouquet, onClick, badge  }: Props) => {
  return (
    <div className="bouquet-compact" onClick={onClick}>
      <div className="bouquet-compact__image-wrap">
        {badge && <div className="bouquet-compact__badge">{badge}</div>}
        <img
          src={bouquet.images?.[0] ?? "/placeholder.jpg"}
          alt={bouquet.name}
          className="bouquet-compact__image"
        />
      </div>

      <div className="bouquet-compact__info">
        <div className="bouquet-compact__name">{bouquet.name}</div>

        {bouquet.description && (
          <div className="bouquet-compact__description">
            {bouquet.description.length > 50
              ? `${bouquet.description.substring(0, 50)}...`
              : bouquet.description}
          </div>
        )}

        <div className="bouquet-compact__prices">
          <span className="bouquet-compact__price">
            {bouquet.price} ₽
          </span>
          {bouquet.oldprice > bouquet.price && (
            <span className="bouquet-compact__oldprice">
              {bouquet.oldprice} ₽
            </span>
          )}
        </div>

        <div 
          className="bouquet-compact__btn" 
          onClick={(e) => {
            e.stopPropagation(); // <-- вот это нужно, чтобы карточка не реагировала
          }}
        >
          <OrderButton
            popup
            bouquetName={bouquet.name}
            contextNameButton="Заказать букет"
            watchField
          />
        </div>
      </div>
    </div>
  );
};

export default BouquetCardCompact;
