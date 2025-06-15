import "./deliveryDicoration.scss"
// import track from "../assets/svg/track.svg"

function DeliveryDicoration() {
  return (
    <div className="advantages">

      <div className="advantages__advantages-wrapper">

        <h2 className="advantages__title">Почему выбирают нас</h2>
        <ul className="advantages__itemes">
          <li className="advantage">
            <svg 
            className="advantage__photo"   
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            >
              <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/>
              <circle cx="12" cy="8" r="2"/>
              <path d="M12 10v12"/>
              <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/>
              <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>
            </svg>
          <p className="advantage__text">
            Только свежие цветы из проверенных источников — мы гарантируем качество и свежесть каждого букета
          </p>
          </li>

          <li className="advantage">
            
            <svg 
            className="advantage__photo"   
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            >

            <path d="m11 17 2 2a1 1 0 1 0 3-3"/>
            <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 
            1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
            />
            <path d="m21 3 1 11h-2"/>
            <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/>
            <path d="M3 4h8"/>
            </svg>

          <p className="advantage__text">
            Индивидуальный подход к каждому заказу — учитываем ваши пожелания и создаём букеты с заботой
          </p>
          </li>

          {/* <li className="advantage">
            <svg 
            className="advantage__photo"   
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            >
              <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
              <path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
              <circle cx="17" cy="18" r="2"/>
              <circle cx="7" cy="18" r="2"/>
            </svg>

          <p className="advantage__text">
            Удобная доставка по Казани: при заказе от 4 000 ₽ бесплатно
          </p>
          </li> */}

          <li className="advantage">
                        <svg 
            className="advantage__photo"   
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            >
              <path 
                d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 
                0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 
                0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 
                14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
              />
            </svg>
          <p className="advantage__text">
            Высокое качество и эстетика — наши флористы делают всё, чтобы ваши цветы выглядели безупречно
          </p>
          </li>
          <li className="advantage">
                                    <svg 
            className="advantage__photo"   
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            >
              <circle cx="12" cy="13" r="8"/>
              <path d="M5 3 2 6"/>
              <path d="m22 6-3-3"/>
              <path d="M6.38 18.7 4 21"/>
              <path d="M17.64 18.67 20 21"/>
              <path d="m9 13 2 2 4-4"/>
            </svg>
          <p className="advantage__text">
            Надежность и пунктуальность — мы ценим ваше время и выполняем заказы точно в срок
          </p>
          </li>
          <li className="advantage">
            <svg 
            className="advantage__photo"   
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 
              0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 
              2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
            </svg>
          <p className="advantage__text">
            Душевное отношение — мы любим свою работу и хотим, чтобы каждый клиент остался доволен
          </p>
          </li>
          <li className="advantage">
            <svg
          className="advantage__photo"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
          stroke-linecap="round" 
          stroke-linejoin="round" 
        >
          <rect x="3" y="8" width="18" height="4" rx="1"/>
          <path d="M12 8v13"/>
          <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
          <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
        </svg>


          <p className="advantage__text">
            Укомплектуем букет до полного подарка - добавим открытку, 
            шоколад, конфеты, мягкую игрушку, вазу. Всё вместе или на ваш выбор
          </p>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default DeliveryDicoration
