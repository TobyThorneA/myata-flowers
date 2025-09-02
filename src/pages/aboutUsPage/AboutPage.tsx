// pages/AboutUs.tsx
const AboutUs = () => {
  return (
    <div className="bg-colorPrimary text-color-text px-4 py-20 md:px-10 md:py-16">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* Заголовок */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-color-text">О нас</h2>
          <p className="text-color-icons mt-1 text-base md:text-lg">
            Myata Flowers — цветы с душой 🌿
          </p>
          <div className="w-20 h-1 bg-color-action mx-auto mt-3 rounded-full" />
        </div>

        <p className="text-base md:text-lg leading-relaxed">
          Myata Flowers появилась в сентябре 2024 года. Мы — молодой бренд, но с чётким пониманием: 
          люди хотят получать именно то, что представляют себе в голове, когда заказывают цветы 🌸
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          У нас действительно большая онлайн-витрина с готовыми букетами, 
          но каждый заказ мы всё равно адаптируем под человека. 
          Учитываем пожелания, корректируем состав, цветовую гамму или упаковку ✂️ 
          В итоге получается не просто шаблон, а что-то своё — «под вас».
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Мы работаем без лишней суеты. Собрали букет — отправили фото перед доставкой. 
          Привезли — убедились, что всё ок. Если что-то не так — мы не спорим, а решаем 🤝
        </p>

        <div className="border-t border-color-icons pt-6">
          <h2 className="text-xl font-semibold mb-2 text-color-action">
            Почему выбирают нас:
          </h2>
          <ul className="list-disc list-inside space-y-2 text-base md:text-lg">
            <li>Всегда свежие цветы 🌷</li>
            <li>Фото букета перед доставкой 📸</li>
            <li>Быстрая доставка по Казани и пригородам 🚗</li>
            <li>Можно собрать букет по фото клиента 🖼️</li>
            <li>Честный подход — без навязывания</li>
          </ul>
        </div>

        <p className="text-base md:text-lg leading-relaxed mt-6">
          Мы здесь не ради одного заказа, а чтобы вы захотели вернуться. 
          Спасибо, что выбираете нас 💚
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
