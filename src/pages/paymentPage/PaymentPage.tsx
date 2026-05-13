import { Banknote, CreditCard, HandCoins, QrCode } from "lucide-react";

const PaymentPage = () => {
  return (
    <section className="bg-colorPrimary px-4 py-20 text-color-text md:px-10 md:py-16">
      {/* <section className="px-4 py-20 max-w-2xl mx-auto text-color-text bg-colorPrimary"> */}
      <h1 className="mb-6 text-center text-2xl font-bold">Оплата заказа</h1>

      <p className="mb-6 text-base leading-relaxed">
        Мы стараемся сделать процесс оплаты удобным и прозрачным. Выбирайте тот способ, который вам
        комфортнее. Если остались вопросы — всегда можно уточнить всё в чате, по телефону или в
        мессенджерах.
      </p>

      <ul className="space-y-6">
        {/* Перевод на карту */}
        <li className="flex items-start gap-3">
          <CreditCard className="mt-1 h-6 w-6 text-color-action" />
          <div>
            <h2 className="mb-1 text-lg font-semibold">Перевод на карту</h2>
            <p>
              Самый простой способ. После подтверждения заказа мы отправим номер карты для оплаты.
              Если вы не уверены, как всё проходит — подскажем.
            </p>
          </div>
        </li>

        {/* СБП / Ссылка */}
        <li className="flex items-start gap-3">
          <QrCode className="mt-1 h-6 w-6 text-color-action" />
          <div>
            <h2 className="mb-1 text-lg font-semibold">Оплата по ссылке</h2>
            <p>
              Также можно оплатить через СБП — это ссылка, которая открывается в вашем банковском
              приложении. Не нужно вводить реквизиты вручную, всё уже заполнено. Удобно и безопасно.
            </p>
          </div>
        </li>

        {/* Наличные при самовывозе */}
        <li className="flex items-start gap-3">
          <Banknote className="mt-1 h-6 w-6 text-color-action" />
          <div>
            <h2 className="mb-1 text-lg font-semibold">Наличными</h2>
            <p>
              При самовывозе с адреса <em>г. Казань, ул. Кул-Гали, 27</em> можно рассчитаться
              наличными. Пожалуйста, заранее согласуйте время, так как витрины нет.
            </p>
          </div>
        </li>

        {/* Оплата при получении */}
        <li className="flex items-start gap-3">
          <HandCoins className="mt-1 h-6 w-6 text-color-action" />
          <div>
            <h2 className="mb-1 text-lg font-semibold">Оплата при получении</h2>
            <p>
              Иногда можно рассчитаться наличными при доставке. Это возможно только в случае, если
              доставляет наш курьер, и заказ передаётся лично получателю. Уточните, пожалуйста, эту
              возможность при заказе.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default PaymentPage;
