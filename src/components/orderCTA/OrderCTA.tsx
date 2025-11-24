import OrderButton from '../orderButton/OrderButton'

interface OrderCTAProps {
  title: string;
  CTA: string;
  bgCollor?: string;
}

const OrderCTA = ({title, CTA, bgCollor = 'bg-collor'}: OrderCTAProps) => {
  return (
    // со стилями надо думать, если меняю марджины они много меняются пока в трех местах. и не везде ясно как будет выглядеть
      <div className={`bg-${bgCollor} pt-5 pb-7 flex flex-col h-auto w-full items-center justify-center text-center`}>
        <h1 className="">{title}</h1>
        <span className='px-5'>{CTA}</span>
        <div className="flex justify-center mt-5 w-2/3">
          <OrderButton/>
        </div>
      </div>
  )
}

export default OrderCTA

