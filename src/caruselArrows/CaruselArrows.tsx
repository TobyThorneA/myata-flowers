import "./caruselArrows.scss"
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
}

const CaruselArrows = ({ onPrev, onNext, className = "" }: CarouselArrowsProps) => {
  return (
    <div className={`carousel-arrows ${className}`}>
      <button className="carousel-arrows__btn left" onClick={onPrev}>
        <ChevronLeft size={32} />
      </button>
      <button className="carousel-arrows__btn right" onClick={onNext}>
        <ChevronRight size={32} />
      </button>
    </div>
  );
}

export default CaruselArrows