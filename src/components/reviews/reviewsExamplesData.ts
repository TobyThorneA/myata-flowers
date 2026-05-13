import one0 from "../../assets/reviews/anastasiya.jpg";
import one1 from "../../assets/reviews/artem.jpg";
import one2 from "../../assets/reviews/elena.jpg";
import one3 from "../../assets/reviews/lyaisan.jpg";

export interface ReviewsExample {
  id: string;
  name: string;
}

export const reviewsExample: ReviewsExample[] = [
  { id: "0", name: one0 },
  { id: "1", name: one1 },
  { id: "2", name: one2 },
  { id: "3", name: one3 },
];
