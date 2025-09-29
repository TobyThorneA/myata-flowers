import OrderButton from "@components/orderButton/OrderButton";
import type { IBouquet } from "@pages/admin/types"

interface BouquetProps {
  bouquet: IBouquet
}

const BouquetInfo = ({bouquet} : BouquetProps) => {

  const oldPrice = bouquet?.oldPrice ?? 0;
  const contextButtonName = "Заказать букет";
  const watchField = true;

  return (
            <div className="flex-1 bg-[#f9f9f9] p-6 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl flex flex-col min-w-0">
              <h2 id="modal-title" className="text-2xl md:text-3xl font-bold mb-4 text-color-text">
                {bouquet.name}
              </h2>
    
              <div className="flex items-baseline gap-6 mb-6 flex-wrap">
                {oldPrice > 0 && (
                  <div className="line-through text-gray-500 text-lg md:text-xl">
                    {oldPrice.toLocaleString("ru-RU")} ₽
                  </div>
                )}
                <div className="text-3xl md:text-4xl font-extrabold text-color-action">
                  {bouquet.price.toLocaleString("ru-RU")} ₽
                </div>
              </div>
    
              {bouquet.size && (
                <div className="mb-4 p-3 bg-white rounded-md shadow-sm text-color-text leading-relaxed">
                  <strong>Размер:</strong> {bouquet.size}
                </div>
              )}
    
              <div className="mb-6 w-full">
                <OrderButton
                  popup
                  bouquetName={bouquet.name}
                  contextNameButton={contextButtonName}
                  watchField={watchField}
                />
              </div>
    
              {bouquet.description && (
                <div
                  id="modal-description"
                  className="mb-6 p-4 bg-white rounded-md shadow-sm text-color-text leading-relaxed"
                >
                  <strong>Описание:</strong> {bouquet.description}
                </div>
              )}
    
              <div>
                <h3 className="text-xl font-semibold mb-3 text-color-text">Связаться с нами:</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="tel:+79656003600"
                    className="block px-4 py-3 rounded-md font-semibold text-white bg-[#4dd0af] hover:opacity-90 transition-opacity"
                  >
                    Позвонить: +7 (965) 600-3-600
                  </a>
                  <a
                    href="https://wa.me/79270387435"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-3 rounded-md font-semibold text-white bg-[#29A71A] hover:opacity-90 transition-opacity"
                  >
                    Написать в WhatsApp
                  </a>
                  <a
                    href="https://t.me/myata_flow"
                    target="_blank"
                    rel="noreferrer"
                    className="block px-4 py-3 rounded-md font-semibold text-white bg-[#0088cc] hover:opacity-90 transition-opacity"
                  >
                    Написать в Telegram
                  </a>
                </div>
              </div>
            </div>
  )
}
export default BouquetInfo