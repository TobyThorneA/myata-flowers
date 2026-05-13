import OrderButton from "../orderButton/OrderButton";

interface OrderCTAProps {
  title: string;
  CTA: string;
  bgCollor?: string;
}

const OrderCTA = ({ title, CTA, bgCollor = "bg-collor" }: OrderCTAProps) => {
  return (
    // со стилями надо думать, если меняю марджины они много меняются пока в трех местах. и не везде ясно как будет выглядеть
    <div
      className={`bg-${bgCollor} flex h-auto w-full flex-col items-center justify-center pb-7 pt-5 text-center`}
    >
      <h1 className="">{title}</h1>
      <span className="px-5">{CTA}</span>
      <div className="mt-5 flex w-2/3 justify-center">
        <OrderButton />
      </div>
    </div>
  );
};

export default OrderCTA;
