interface ReviewsExamlesProps {
  id?: string;
  name: string;
}

const ReviewsExamles: React.FC<ReviewsExamlesProps> = ({ name }) => {
  return (
    <div className="relative flex-[0_0_80%] px-2 md:flex-[0_0_40%] landscape:flex-[0_0_40%]">
      <img src={name} alt="" className="w-full rounded-lg" />
    </div>
  );
};

export default ReviewsExamles;
