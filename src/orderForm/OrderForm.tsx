// orderForm
import { useEffect, useState } from "react";
import "./popup.scss";

interface OrderFormProps {
  onClose: () => void;
}

interface FormData {
  name: string,
  phone: string,
  question1: string,
  question2: string,
  question3: string,
  honeypot: string,
}

const OrderForm = ({ onClose }: OrderFormProps) => {

  // Для закрытия скролла на айфоне
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100%';

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, []);

// обработчик esc
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    question1: '',
    question2: '',
    question3: '',
    honeypot: '',
  });

  const sendToTelegram = async (data: FormData) => {
    if (data.honeypot && data.honeypot.trim() !== '') {
      console.warn('Бот обнаружен, отправка отменена.');
      return;
    }

    const chatId = '7911798658'; // chat_id
    const message = `
      💐 Новая заявка на букет:
      👤 Имя: ${data.name}
      📞 Телефон: ${data.phone}
      🌸 Предпочтения: ${data.question1}
      💰 Повод: ${data.question2}
      📦 Пожелания по оформлению: ${data.question3}
    `.trim();


    try {
      const response = await fetch('/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          honeypot: data.honeypot,
          parse_mode: 'HTML',
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке в Telegram');
      }

      console.log('Заявка отправлена!');
    } catch (error) {
      console.error('Ошибка Telegram:', error);
    }
  };

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const {name, value} = e.target;

    setFormData((previos) => ({
      ...previos,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendToTelegram(formData);
    setIsSubmitted(true);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button className="popup__close" onClick={onClose}>×</button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="popup__form">
            <h2>Подобрать букет</h2>
            <input
              type="text"
              name="honeypot"
              style={{ display: 'none' }}
              autoComplete="off"
              onChange={handleFormData}
            />
            <input onChange={handleFormData}
             type="text" name="name" placeholder="Имя" required />
            <input onChange={handleFormData} type="tel" name="phone" placeholder="Телефон" required />
            <textarea onChange={handleFormData} name="question1" placeholder="Какие цветы хотите?" required />
            <textarea onChange={handleFormData} name="question2" placeholder="Повод / кому дарите?" required />
            <textarea onChange={handleFormData} name="question3" placeholder="Пожелания по оформлению" />
            <button type="submit">Заказать</button>
          </form>
        ) : (
          <div className="popup__success">
            <h2>Спасибо!</h2>
            <p>Мы свяжемся с вами в ближайшее время 😊</p>
            <button onClick={onClose}>Закрыть</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
