import one0 from "../../assets/reviews/anastasiya.jpg";
import one1 from "../../assets/reviews/artem.jpg";
import one2 from "../../assets/reviews/elena.jpg";
import one3 from "../../assets/reviews/lyaisan.jpg";

interface ReviewsExamlesProps {
    id?: string,
    name: string,
  
}

export const reviewsExample: Array<ReviewsExamlesProps> = [{id: '0', name: one0}, {id: '1', name: one1}, {id: '2', name: one2}, {id: '3', name: one3}]

const ReviewsExamles: React.FC<ReviewsExamlesProps> = ({ name }) => {
  return (
    <div className="relative flex-[0_0_80%] px-2 md:flex-[0_0_40%] landscape:flex-[0_0_40%]">
      <img src={ name } alt="" className="w-full rounded-lg" />
    </div>
  )
}

export default ReviewsExamles