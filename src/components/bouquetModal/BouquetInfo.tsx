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
    <div className="bg-mint-50 text-soft-text flex min-w-0 flex-1 flex-col rounded-b-2xl p-8 md:rounded-r-2xl md:rounded-bl-none">
      {/* Название */}
      <h2
        id="modal-title"
        className="text-mint-700 mb-6 font-cursive text-3xl font-bold md:text-4xl"
      >
        {bouquet.name}
      </h2>

      {/* Цена */}
      <div className="mb-2 flex flex-wrap items-baseline gap-6 font-cursive">
        <div className="text-mint-600 text-4xl font-extrabold text-color-action drop-shadow-sm">
          {bouquet.price.toLocaleString("ru-RU")} ₽
        </div>
        {oldPrice > 0 && (
          <div className="text-xl text-gray-500 line-through">
            {oldPrice.toLocaleString("ru-RU")} ₽
          </div>
        )}
      </div>

      {/* Размер */}
      {bouquet.size && (
        <div className="bg-soft-bg mb-8 rounded-xl font-cursive shadow-sm">
          <strong>Размер:</strong> {bouquet.size}
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
          className="mb-8 rounded-xl bg-bg-collor p-5 font-sansSerif leading-relaxed shadow-sm"
        >
          <strong className="text-mint-700">Описание:</strong> {bouquet.description}
        </div>
      )}

      {/* Контакты */}
      <div>
        <h3 className="text-mint-700 mb-4 font-cursive text-2xl font-semibold">
          Связаться с нами:
        </h3>

        <div className="flex flex-col gap-3">
          <a
            href="tel:+79656003600"
            className="block rounded-xl bg-[#67A799] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#4f8b74]"
          >
            Позвонить: +7 (965) 600-3-600
          </a>

          <a
            href="https://wa.me/79270387435"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-[#29A71A] px-4 py-3 font-semibold text-white transition hover:bg-[#238E17]"
          >
            Написать в WhatsApp
          </a>

          <a
            href="https://t.me/myata_flow"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-[#0088cc] px-4 py-3 font-semibold text-white transition hover:bg-[#0074ad]"
          >
            Написать в Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default BouquetInfo;
