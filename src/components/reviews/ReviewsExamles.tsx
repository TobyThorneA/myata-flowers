import one0 from "../../assets/reviews/anastasiya.jpg";
import one1 from "../../assets/reviews/artem.jpg";
import one2 from "../../assets/reviews/elena.jpg";
import one3 from "../../assets/reviews/lyaisan.jpg";

interface ReviewsExamlesProps {
  reviewExample: string,
}

export const reviewsExample: Array<string> = [one0, one1, one2, one3]

const ReviewsExamles: React.FC<ReviewsExamlesProps> = ({ reviewExample }) => {
  return (
    <div className="relative flex-[0_0_80%] px-2 md:flex-[0_0_40%] landscape:flex-[0_0_40%]">
      <img src={ reviewExample } alt="" className="w-full rounded-lg" />
    </div>
  )
}

export default ReviewsExamles