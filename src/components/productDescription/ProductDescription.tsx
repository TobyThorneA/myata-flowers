const ProductDescription = () => {
  return (
    <div className="mt-4 rounded-lg bg-bg-collor px-4 py-5 font-sansSerif md:mt-6 md:py-8 lg:mt-8 lg:py-10">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center font-cursive text-2xl font-bold font-normal md:text-3xl">
          Наш ассортимент
        </h2>

        <p className="mb-4 text-center text-sm text-color-text md:text-base lg:text-lg">
          Ищете идеальный подарок? В Myata Flowers мы создаём уникальные букеты из пионовидных роз,
          эквадорских и классических роз, хризантем, альстромерий и других свежих цветов с душой и
          заботой. Каждая композиция подарит радость вашим близким и создаст настроение праздника.
        </p>

        {/* Список без точек — чистый, центрированный */}
        <ul className="mx-auto w-fit list-none space-y-4 text-center text-sm font-medium text-color-text md:text-base md:font-semibold lg:text-lg">
          <li>
            <strong>Пионовидные розы</strong> — нежные и пышные, похожие на пионы, они станут
            изысканным украшением любого букета.
          </li>

          <li>
            <strong>Эквадорские розы</strong> — крупные, стойкие и элегантные, идеальны для
            особенных случаев.
          </li>

          <li>
            <strong>Классические розы</strong> — всегда актуальны и прекрасно подходят для выражения
            чувств.
          </li>

          <li>
            <strong>Хризантемы</strong> — яркие и жизнерадостные, придают композициям объем и
            свежесть.
          </li>

          <li>
            <strong>Альстромерии</strong> — нежные и долговечные цветы, которые добавят изысканности
            вашему подарку.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDescription;
