import "./deliveryDicoration.scss"
// import track from "../assets/svg/track.svg"

function DeliveryDicoration() {
  return (
    <div className="delivery-decoration">
      <h3 className="delivery-decoration__title">Доставка и оформление</h3>
      <div className="delivery-decoration__advantages-wrapper">
        <div className="advantage">

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
            Привезем вовремя, доставка от 30 минут или к назначенному времени
          </p>
        </div>
        <div className="advantage">
          
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
            Упакуем в стильную пленку, ленту или подарочную коробку
          </p>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDicoration