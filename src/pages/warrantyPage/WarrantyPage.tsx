import { ShieldCheck, Flower2, Undo2 } from "lucide-react";

const WarrantyPage = () => {
  return (
    <section className="bg-colorPrimary text-color-text px-4 py-20 md:px-10 md:py-16">
      <h1 className="text-2xl font-bold mb-6 text-center">Гарантии качества</h1>

      <p className="mb-6 text-base leading-relaxed">
        Мы с уважением подходим к каждому заказу и собираем букеты исключительно из свежих цветов. Каждый букет мы создаём вручную — под конкретного человека и по конкретному случаю. Нам важно, чтобы вы остались довольны не только внешним видом, но и качеством.
      </p>

      <ul className="space-y-6">
        {/* Свежесть и отбор */}
        <li className="flex items-start gap-3">
          <Flower2 className="w-6 h-6 mt-1 text-color-action" />
          <div>
            <h2 className="font-semibold text-lg mb-1">Только свежие цветы</h2>
            <p>
              Мы закупаем цветы ежедневно и следим за их состоянием на всех этапах — от поставки до сборки букета. Отбор проходит вручную, никаких "залежалых" цветов.
            </p>
          </div>
        </li>

        {/* Гарантия на сутки */}
        <li className="flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 mt-1 text-color-action" />
          <div>
            <h2 className="font-semibold text-lg mb-1">Гарантия 24 часа</h2>
            <p>
              Если при правильном уходе и хранении с букетом что-то случится в течение суток после получения — мы решим вопрос. Например, если цветы неожиданно завяли — мы соберём такой же букет или предложим аналогичный по стоимости.
            </p>
          </div>
        </li>

        {/* Честность и адекватность */}
        <li className="flex items-start gap-3">
          <Undo2 className="w-6 h-6 mt-1 text-color-action" />
          <div>
            <h2 className="font-semibold text-lg mb-1">Адекватные условия</h2>
            <p>
              Мы честно берём ответственность, если проблема возникла по нашей вине. При этом важно понимать: если букет, например, пролежал сутки без воды или его повредили — это уже не гарантийный случай. Мы всегда готовы к диалогу и постараемся найти решение, если что-то пошло не так.
            </p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default WarrantyPage;
