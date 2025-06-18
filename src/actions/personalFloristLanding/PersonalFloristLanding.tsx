// PersonalFloristLanding.tsx
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './PersonalFloristLanding.scss';
import OrderForm from '../../orderForm/OrderForm';

const PersonalFloristLanding = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  // const navigate = useNavigate();

  return (
    <div className="florist-page">
      {/* Герой-секция */}
      <header className="florist-hero">
        <div className="hero-content">
          <h1>Ваш персональный флорист</h1>
          <p>Индивидуальный подбор букета по вашим пожеланиям</p>
          <button 
            className="cta-button"
            onClick={() => setIsFormOpen(true)}
          >
            Получить консультацию
          </button>
        </div>
      </header>

      {/* Процесс работы */}
      <section className="process-section">
        <h2>Как это работает</h2>
        <div className="process-steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Консультация</h3>
            <p>Обсуждаем ваши пожелания, бюджет и повод</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Подбор вариантов</h3>
            <p>Флорист создает 3 уникальных эскиза букета</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Утверждение</h3>
            <p>Вы выбираете лучший вариант и вносите правки</p>
          </div>
          <div className="step">
            <div className="step-icon">4</div>
            <h3>Доставка</h3>
            <p>Создаем и доставляем ваш идеальный букет</p>
          </div>
        </div>
      </section>

      {/* Примеры работ */}
      <section className="portfolio-section">
        <h2>Наши эксклюзивные букеты</h2>
        <div className="portfolio-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="portfolio-item" key={item}>
              <div className="portfolio-image"></div>
              <div className="portfolio-details">
                <h3>Индивидуальный букет #{item}</h3>
                <p>Создан по пожеланиям клиента</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="florist-cta">
        <div className="cta-content">
          <h2>Хотите уникальный букет?</h2>
          <p>Наши флористы создадут композицию специально для вас</p>
          <button 
            className="cta-button"
            onClick={() => setIsFormOpen(true)}
          >
            Заказать консультацию
          </button>
        </div>
      </section>

      {/* Отзывы */}
      <section className="testimonials">
        <h2>Что говорят клиенты</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"Флорист учла все мои пожелания! Букет получился даже лучше, чем я представляла"</p>
            <div className="client">- Анна, 29 лет</div>
          </div>
          <div className="testimonial">
            <p>"Заказал букет на юбилей родителей. Профессиональный подход и потрясающий результат!"</p>
            <div className="client">- Максим, 35 лет</div>
          </div>
        </div>
      </section>

      {/* Форма заказа */}
      {isFormOpen && <OrderForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default PersonalFloristLanding;