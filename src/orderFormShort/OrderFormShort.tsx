// // OrderFormShort.tsx
import { useState } from 'react';
import './orderFormShort.scss';

interface ShortOrderFormProps {
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

const OrderFormShort = ({ 
  onSuccess, 
  title = "Заказать букет", 
  subtitle = "Оставьте телефон, мы свяжемся с вами в течение 10 минут" 
}: ShortOrderFormProps) => {
  const [phone, setPhone] = useState('');
  const [contactMethod, setContactMethod] = useState<'call' | 'telegram' | 'whatsapp'>('call');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validatePhone = (phone: string) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    return cleanedPhone.length >= 10;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePhone(phone)) {
      setError('Введите корректный номер телефона');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Здесь будет реальный запрос к API
      // Для демонстрации используем таймаут
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Отправка данных в Telegram
      await fetch('/api.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: '7911798658',
          text: `📞 Новая заявка:\nТелефон: ${phone}\nСпособ связи: ${getContactMethodName(contactMethod)}`,
        }),
      });
      
      setIsSubmitted(true);
      setIsLoading(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Ошибка при отправке. Попробуйте еще раз');
      setIsLoading(false);
      console.log('err зачем то', err)
    }
  };

  const getContactMethodName = (method: string) => {
    switch (method) {
      case 'call': return 'Позвонить';
      case 'telegram': return 'Telegram';
      case 'whatsapp': return 'WhatsApp';
      default: return '';
    }
  };


  // надо доработать
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const cleaned = input.replace(/\D/g, '');
    
    // Определяем страну по первой цифре
    let countryCode = '';
    let phoneDigits = '';
    
    if (cleaned.startsWith('8')) {
      // Российский номер в формате 8
      countryCode = '+7';
      phoneDigits = cleaned.substring(1);
    } else if (cleaned.startsWith('7')) {
      // Российский номер в формате +7
      countryCode = '+7';
      phoneDigits = cleaned.substring(1);
    } else if (cleaned.startsWith('9') && cleaned.length === 11) {
      // Предполагаем российский номер без кода страны
      countryCode = '+7';
      phoneDigits = cleaned;
    } else if (cleaned.length > 0) {
      // Международный номер
      countryCode = `+${cleaned.charAt(0)}`;
      phoneDigits = cleaned.substring(1);
    }

    // Ограничиваем длину номера
    const maxDigits = countryCode === '+7' ? 10 : 15; // 10 для России, 15 для других
    phoneDigits = phoneDigits.substring(0, maxDigits);

    // Форматируем номер
    let formattedValue = countryCode;
    
    if (phoneDigits.length > 0) {
      if (countryCode === '+7') {
        // Российский формат: +7 (XXX) XXX-XX-XX
        formattedValue += ' (' + phoneDigits.substring(0, 3);
        
        if (phoneDigits.length > 3) {
          formattedValue += ') ' + phoneDigits.substring(3, 6);
        }
        if (phoneDigits.length > 6) {
          formattedValue += '-' + phoneDigits.substring(6, 8);
        }
        if (phoneDigits.length > 8) {
          formattedValue += '-' + phoneDigits.substring(8, 10);
        }
      } else {
        // Международный формат: +X (XXX) XXX-XXXX
        formattedValue += ' (' + phoneDigits.substring(0, 3);
        
        if (phoneDigits.length > 3) {
          formattedValue += ') ' + phoneDigits.substring(3, 6);
        }
        if (phoneDigits.length > 6) {
          formattedValue += '-' + phoneDigits.substring(6);
        }
      }
    }

    setPhone(formattedValue);
  };

  return (
    <div className="short-order-form">
      {!isSubmitted ? (
        <>
          <div className="form-header">
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="order-form">
            <div className="input-group">
              <label htmlFor="phone">Ваш телефон</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 999-99-99"
                required
              />
            </div>
            
            <div className="contact-methods">
              <p>Предпочтительный способ связи:</p>
              <div className="method-options">
                <label className={`method-option ${contactMethod === 'call' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="contactMethod"
                    checked={contactMethod === 'call'}
                    onChange={() => setContactMethod('call')}
                  />
                  <span className="option-icon">📞</span>
                  <span className="option-text">Позвонить</span>
                </label>
                
                <label className={`method-option ${contactMethod === 'telegram' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="contactMethod"
                    checked={contactMethod === 'telegram'}
                    onChange={() => setContactMethod('telegram')}
                  />
                  <span className="option-icon">✈️</span>
                  <span className="option-text">Telegram</span>
                </label>
                
                <label className={`method-option ${contactMethod === 'whatsapp' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="contactMethod"
                    checked={contactMethod === 'whatsapp'}
                    onChange={() => setContactMethod('whatsapp')}
                  />
                  <span className="option-icon">💬</span>
                  <span className="option-text">WhatsApp</span>
                </label>
              </div>
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button 
              type="submit" 
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                'Заказать букет'
              )}
            </button>
            
            <div className="form-footer">
              <p>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </div>
          </form>
        </>
      ) : (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h3>Спасибо за заявку!</h3>
          <p>Мы свяжемся с вами в ближайшее время через {getContactMethodName(contactMethod).toLowerCase()}</p>
          <button 
            className="close-button"
            onClick={() => setIsSubmitted(false)}
          >
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderFormShort;
