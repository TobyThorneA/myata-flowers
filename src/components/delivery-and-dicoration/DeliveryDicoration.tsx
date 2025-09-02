const DeliveryDicoration = () => {
  return (
    <div className="px-4 mt-4 md:mt-6 lg:mt-8">
      <div className="max-w-5xl mx-auto md:ml-5">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
          Почему выбирают нас
        </h2>
        <ul className="space-y-6">
          {[
            {
              icon: (
                <>
                  <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
                  <circle cx="12" cy="8" r="2" />
                  <path d="M12 10v12" />
                  <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
                  <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
                </>
              ),
              text: "Только свежие цветы из проверенных источников — мы гарантируем качество и свежесть каждого букета",
            },
            {
              icon: (
                <>
                  <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                  <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                  <path d="m21 3 1 11h-2" />
                  <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                  <path d="M3 4h8" />
                </>
              ),
              text: "Индивидуальный подход к каждому заказу — учитываем ваши пожелания и создаём букеты с заботой",
            },
            {
              icon: (
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 
                  0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 
                  0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 
                  14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
              ),
              text: "Высокое качество и эстетика — наши флористы делают всё, чтобы ваши цветы выглядели безупречно",
            },
            {
              icon: (
                <>
                  <circle cx="12" cy="13" r="8" />
                  <path d="M5 3 2 6" />
                  <path d="m22 6-3-3" />
                  <path d="M6.38 18.7 4 21" />
                  <path d="M17.64 18.67 20 21" />
                  <path d="m9 13 2 2 4-4" />
                </>
              ),
              text: "Надежность и пунктуальность — мы ценим ваше время и выполняем заказы точно в срок",
            },
            {
              icon: (
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 
                0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 
                2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              ),
              text: "Душевное отношение — мы любим свою работу и хотим, чтобы каждый клиент остался доволен",
            },
            {
              icon: (
                <>
                  <rect x="3" y="8" width="18" height="4" rx="1" />
                  <path d="M12 8v13" />
                  <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                  <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
                </>
              ),
              text: "Укомплектуем букет до полного подарка — открытка, шоколад, мягкая игрушка и другое по вашему выбору",
            },
          ].map(({ icon, text }, idx) => (
            <li
              key={idx}
              className="flex gap-4 items-start md:items-center text-center md:text-left"
            >
              <svg
                className="w-12 h-12 stroke-current text-color-icons shrink-0 mt-1"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icon}
              </svg>
              <p className="text-sm md:text-base lg:text-lg font-medium md:font-semibold">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeliveryDicoration;
