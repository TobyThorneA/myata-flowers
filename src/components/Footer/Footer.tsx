import { NavLink } from "react-router-dom";

// components/Footer/Footer.tsx
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-color-icons text-white py-8 px-4 text-sm mb-[70px] md:mb-1">
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">

        {/* Лого и слоган */}
        <div>
          <h2 className="text-xl font-bold">Myata Flowers</h2>
          <p className="mt-2 text-white/80">
            Цветы с характером — как вы. Без витрин. Только по любви.
          </p>
        </div>

        {/* Контакты */}
        <div>
          <h3 className="font-semibold mb-2">Контакты</h3>
          <ul className="space-y-1 text-white/80">
            <li><a href="tel:89656003600">8 965 600 36 00</a></li>
            <li><a href="https://t.me/myata_flow" target="_blank" rel="noreferrer">Telegram</a></li>
            <li><a href="https://wa.me/79270387435" target="_blank" rel="noreferrer">WhatsApp</a></li>
            <li>Казань, ул. Кул-Гали 27 (самовывоз)</li>
          </ul>
        </div>

        {/* Ссылки */}
        <div>
          <h3 className="font-semibold mb-2">Информация</h3>
          <ul className="space-y-1 text-white/80">
            <li><NavLink to="/about">О компании</NavLink></li>
            <li><NavLink to="/payment">Оплата</NavLink></li>
            <li><NavLink to="/delivery">Доставка</NavLink></li>
            <li><NavLink to="/privacy-policy">Политика конфиденциальности</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Юр. информация */}
      <div className="mt-8 border-t border-white/20 pt-4 text-xs text-white/60 text-center space-y-1">
        <div>
          ИП Аширов Вячеслав Владимирович · ИНН 166007206323 · ОГРНИП 325169000023314
        </div>
        <div>
          © {currentYear} Myata Flowers. Все права защищены.
        </div>
        <div>
          Разработка сайта — <a className="underline" href="https://t.me/VyacheslavVladimirovichA" target="_blank" rel="noreferrer">
            Вячеслав Аширов
          </a> · <a className="underline" href="tel:89655800506">8 965 580 05 06</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
