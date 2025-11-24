const ProductDescription = () => {
  return (
    <div className="font-sansSerif px-4 mt-4 md:mt-6 lg:mt-8 bg-bg-collor py-5 md:py-8 lg:py-10 rounded-lg">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-cursive font-normal text-2xl md:text-3xl font-bold mb-4 text-center">
          Наш ассортимент
        </h2>

        <p className="text-sm md:text-base lg:text-lg text-center mb-4 text-color-text">
          Ищете идеальный подарок? В Myata Flowers мы создаём уникальные букеты из пионовидных роз, эквадорских и классических роз, хризантем, альстромерий и других свежих цветов с душой и заботой. Каждая композиция подарит радость вашим близким и создаст настроение праздника.
        </p>

        {/* Список без точек — чистый, центрированный */}
        <ul className="space-y-4 text-sm md:text-base lg:text-lg font-medium md:font-semibold text-color-text list-none text-center mx-auto w-fit">

          <li>
            <strong>Пионовидные розы</strong> — нежные и пышные, похожие на пионы, они станут изысканным украшением любого букета.
          </li>

          <li>
            <strong>Эквадорские розы</strong> — крупные, стойкие и элегантные, идеальны для особенных случаев.
          </li>

          <li>
            <strong>Классические розы</strong> — всегда актуальны и прекрасно подходят для выражения чувств.
          </li>

          <li>
            <strong>Хризантемы</strong> — яркие и жизнерадостные, придают композициям объем и свежесть.
          </li>

          <li>
            <strong>Альстромерии</strong> — нежные и долговечные цветы, которые добавят изысканности вашему подарку.
          </li>

        </ul>
      </div>
    </div>
  );

};

export default ProductDescription;
