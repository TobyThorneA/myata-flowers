// FlowerSubscriptionLanding.tsx
import { useState } from 'react';
import './FlowerSubscriptionLanding.scss';
import OrderForm from '@components/orderForm/OrderForm';

const FlowerSubscriptionLanding = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const subscriptionPlans = [
    {
      id: 'weekly',
      name: 'Еженедельная',
      price: '2 990₽/мес',
      discount: 'Экономия 15%',
      description: 'Свежий букет каждую неделю',
      features: ['4 букета в месяц', 'Бесплатная доставка', 'Персональные рекомендации']
    },
    {
      id: 'biweekly',
      name: 'Раз в две недели',
      price: '1 790₽/мес',
      discount: 'Экономия 10%',
      description: 'Идеальный вариант для настроения',
      features: ['2 букета в месяц', 'Бесплатная доставка', 'Сюрприз от флориста']
    },
    {
      id: 'monthly',
      name: 'Ежемесячная',
      price: '990₽/мес',
      discount: 'Экономия 5%',
      description: 'Цветочное удовольствие раз в месяц',
      features: ['1 букет в месяц', 'Бесплатная доставка', 'Гибкое расписание']
    }
  ];

  return (
    <div className="subscription-page">
      {/* Герой-секция */}
      <header className="subscription-hero">
        <div className="hero-content">
          <h1>Цветы по подписке</h1>
          <p>Регулярная доставка свежих букетов с выгодой до 15%</p>
        </div>
      </header>

      {/* Преимущества */}
      <section className="benefits-section">
        <div className="benefits-grid">
          <div className="benefit">
            <div className="benefit-icon">💐</div>
            <h3>Всегда свежие</h3>
            <p>Новые букеты каждую неделю</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">🎁</div>
            <h3>Экономия</h3>
            <p>Постоянная скидка до 15%</p>
          </div>
          <div className="benefit">
            <div className="benefit-icon">🚚</div>
            <h3>Бесплатная доставка</h3>
            <p>В удобное для вас время</p>
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="plans-section">
        <h2>Выберите подписку</h2>
        <div className="plans-grid">
          {subscriptionPlans.map(plan => (
            <div 
              className={`plan-card ${selectedPlan === plan.id ? 'selected' : ''}`} 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}</div>
              <div className="discount">{plan.discount}</div>
              <p className="description">{plan.description}</p>
              <ul className="features">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Примеры букетов */}
      <section className="bouquets-preview">
        <h2>Какие букеты вы получите</h2>
        <div className="bouquets-grid">
          {[1, 2, 3, 4].map(item => (
            <div className="bouquet-card" key={item}>
              <div className="bouquet-image"></div>
              <div className="bouquet-info">
                <h3>Букет недели #{item}</h3>
                <p>Сезонная композиция из свежих цветов</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="subscription-cta">
        <div className="cta-content">
          <h2>Начните получать цветы регулярно!</h2>
          <p>Оставьте заявку и мы подберем идеальный вариант подписки</p>
          <button 
            className="cta-button"
            onClick={() => setIsFormOpen(true)}
            disabled={!selectedPlan}
          >
            Оформить подписку
          </button>
        </div>
      </section>

      {/* Форма заказа */}
      {isFormOpen && <OrderForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
};

export default FlowerSubscriptionLanding;