// pages/AboutUs.tsx
const AboutUs = () => {
  return (
    <div className="bg-colorPrimary px-4 py-20 text-color-text md:px-10 md:py-16">
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Заголовок */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-color-text md:text-4xl">О нас</h2>
          <p className="mt-1 text-base text-color-icons md:text-lg">
            Myata Flowers — цветы с душой 🌿
          </p>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-color-action" />
        </div>

        <p className="text-base leading-relaxed md:text-lg">
          Myata Flowers появилась в сентябре 2024 года. Мы — молодой бренд, но с чётким пониманием:
          люди хотят получать именно то, что представляют себе в голове, когда заказывают цветы 🌸
        </p>

        <p className="text-base leading-relaxed md:text-lg">
          У нас действительно большая онлайн-витрина с готовыми букетами, но каждый заказ мы всё
          равно адаптируем под человека. Учитываем пожелания, корректируем состав, цветовую гамму
          или упаковку ✂️ В итоге получается не просто шаблон, а что-то своё — «под вас».
        </p>

        <p className="text-base leading-relaxed md:text-lg">
          Мы работаем без лишней суеты. Собрали букет — отправили фото перед доставкой. Привезли —
          убедились, что всё ок. Если что-то не так — мы не спорим, а решаем 🤝
        </p>

        <div className="border-t border-color-icons pt-6">
          <h2 className="mb-2 text-xl font-semibold text-color-action">Почему выбирают нас:</h2>
          <ul className="list-inside list-disc space-y-2 text-base md:text-lg">
            <li>Всегда свежие цветы 🌷</li>
            <li>Фото букета перед доставкой 📸</li>
            <li>Быстрая доставка по Казани и пригородам 🚗</li>
            <li>Можно собрать букет по фото клиента 🖼️</li>
            <li>Честный подход — без навязывания</li>
          </ul>
        </div>

        <p className="mt-6 text-base leading-relaxed md:text-lg">
          Мы здесь не ради одного заказа, а чтобы вы захотели вернуться. Спасибо, что выбираете нас
          💚
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
