import { Clock4, Package, Phone, Truck } from "lucide-react";

const DeliveryMethodsPage = () => {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-color-text">
      <h1 className="mb-6 text-center text-2xl font-bold">Способы доставки</h1>

      {/* Бесплатная доставка */}
      <div className="mb-6 rounded-xl border-l-4 border-green-400 bg-green-100 p-4">
        <p className="text-md font-medium">
          При заказе от <span className="font-bold">4000₽</span> доставка по Казани —{" "}
          <span className="font-bold text-green-700">бесплатно</span>
        </p>
      </div>

      {/* Курьер и Яндекс */}
      <div className="mb-8 space-y-4">
        <div className="flex items-start gap-3">
          <Truck className="mt-1 h-6 w-6 text-color-action" />
          <p>
            Доставка <strong>нашим курьером</strong> или через <strong>Яндекс.Доставку</strong> — по
            договоренности. Стоимость от <span className="font-semibold">250₽</span>, зависит от
            адреса и времени заказа (вечер, час пик, ночное время и т.д.).
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Clock4 className="mt-1 h-6 w-6 text-color-action" />
          <p>
            Доставляем <strong>в любое удобное время</strong>. Договоримся заранее. Иногда успеваем
            и за 30 минут 💨
          </p>
        </div>

        <div className="flex items-start gap-3">
          <Package className="mt-1 h-6 w-6 text-color-action" />
          <p>
            Возможен <strong>самовывоз</strong> с адреса: г. Казань, ул. Кул-Гали, 27. <br />
            Витрины нет, договориться нужно заранее.
          </p>
        </div>
      </div>

      {/* Связь */}
      <div className="flex items-start gap-3">
        <Phone className="mt-1 h-6 w-6 text-color-action" />
        <p>
          Согласовать доставку можно как удобно: <br />
          📞{" "}
          <a href="tel:89656003600" className="text-color-action hover:underline">
            8965 600-3-600
          </a>
          <br />
          💬{" "}
          <a
            href="https://wa.me/79270387435"
            target="_blank"
            className="text-color-action hover:underline"
          >
            WhatsApp
          </a>{" "}
          или{" "}
          <a
            href="https://t.me/myata_flow"
            target="_blank"
            className="text-color-action hover:underline"
          >
            Telegram
          </a>
        </p>
      </div>
    </section>
  );
};

export default DeliveryMethodsPage;
