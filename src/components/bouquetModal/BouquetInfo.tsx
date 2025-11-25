import OrderButton from "@components/orderButton/OrderButton";
import type { IBouquet } from "@pages/admin/types";

interface BouquetProps {
  bouquet: IBouquet;
}

const BouquetInfo = ({ bouquet }: BouquetProps) => {
  const oldPrice = bouquet?.oldPrice ?? 0;
  const contextButtonName = "Заказать букет";
  const watchField = true;

  return (
    <div className="flex-1 bg-mint-50 p-8 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl flex flex-col min-w-0 text-soft-text">

      {/* Название */}
      <h2 
        id="modal-title"
        className=" font-cursive text-3xl md:text-4xl font-bold mb-6 text-mint-700"
      >
        {bouquet.name}
      </h2>

      {/* Цена */}
      <div className="font-cursive flex items-baseline gap-6 mb-2 flex-wrap">
        <div className="text-4xl text-color-action font-extrabold text-mint-600 drop-shadow-sm">
          {bouquet.price.toLocaleString("ru-RU")} ₽
        </div>
        {oldPrice > 0 && (
          <div className="line-through text-gray-500 text-xl">
            {oldPrice.toLocaleString("ru-RU")} ₽
          </div>
        )}
      </div>

      {/* Размер */}
      {bouquet.size && (
        <div className="font-cursive mb-8 bg-soft-bg rounded-xl shadow-sm">
          <strong >Размер:</strong> {bouquet.size}
        </div>
      )}

      {/* Кнопка заказа */}
      <div className="mb-6 w-full">
        <OrderButton
          // modal
          bouquetName={bouquet.name}
          contextNameButton={contextButtonName}
          watchField={watchField}
        />
      </div>

      {/* Описание */}
      {bouquet.description && (
        <div
          id="modal-description"
          className="mb-8 p-5 bg-bg-collor font-sansSerif rounded-xl shadow-sm leading-relaxed"
        >
          <strong className="text-mint-700">Описание:</strong>{" "}
          {bouquet.description}
        </div>
      )}

      {/* Контакты */}
      <div>
        <h3 className="font-cursive text-2xl font-semibold mb-4 text-mint-700">
          Связаться с нами:
        </h3>

        <div className="flex flex-col gap-3">
          <a
            href="tel:+79656003600"
            className="block px-4 py-3 rounded-xl font-semibold text-white bg-[#67A799] text-sm hover:bg-[#4f8b74] transition"
          >
            Позвонить: +7 (965) 600-3-600
          </a>

          <a
            href="https://wa.me/79270387435"
            target="_blank"
            rel="noreferrer"
            className="block px-4 py-3 rounded-xl font-semibold text-white bg-[#29A71A] hover:bg-[#238E17] transition"
          >
            Написать в WhatsApp
          </a>

          <a
            href="https://t.me/myata_flow"
            target="_blank"
            rel="noreferrer"
            className="block px-4 py-3 rounded-xl font-semibold text-white bg-[#0088cc] hover:bg-[#0074ad] transition"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default BouquetInfo;

