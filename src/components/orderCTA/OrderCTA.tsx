import OrderButton from '../orderButton/OrderButton'

interface OrderCTAProps {
  title: string;
  CTA: string;
}

const OrderCTA = ({title, CTA}: OrderCTAProps) => {
  return (
    // со стилями надо думать, если меняю марджины они много меняются пока в трех местах. и не везде ясно как будет выглядеть
      <div className="flex flex-col h-auto w-full mt-0 mb-5 items-center justify-center text-center">
        <h1 className="">{title}</h1>
        <span className='px-5'>{CTA}</span>
        <div className="flex justify-center mt-5 w-2/3">
          <OrderButton/>
        </div>
      </div>
  )
}

export default OrderCTA

