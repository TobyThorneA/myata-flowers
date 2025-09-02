const ProductDescription = () => {
  return (
    <div className="px-4 mt-4 md:mt-6 lg:mt-8 bg-colorPrimary py-5 md:py-8 lg:py-10 rounded-lg">
      <div className="max-w-5xl mx-auto md:ml-5">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
          Наш ассортимент
        </h2>
        <p className="text-sm md:text-base lg:text-lg text-center md:text-left mb-4 text-color-text">
          Ищете идеальный подарок? В Myata Flowers мы создаём уникальные букеты из пионовидных роз, эквадорских и классических роз, хризантем, альстромерий и других свежих цветов с душой и заботой. Каждая композиция подарит радость вашим близким и создаст настроение праздника.
        </p>
        <ul className="space-y-4 text-sm md:text-base lg:text-lg font-medium md:font-semibold text-color-text list-disc pl-5">
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
