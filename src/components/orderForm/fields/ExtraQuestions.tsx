// components/orderForm/fields/ExtraQuestions.tsx
import type { ChangeEvent } from "react";

interface Props {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  watchField: boolean;
}

const ExtraQuestions = ({ onChange, watchField }: Props) => (
  <>
    <textarea
      onChange={onChange}
      name="kindOfFlowers"
      placeholder="Какие цветы хотите?"
      hidden={watchField}
    />
    <textarea
      onChange={onChange}
      name="whomGifts"
      placeholder="Повод / кому дарите?"
      hidden={watchField}
    />
    <textarea
      onChange={onChange}
      name="flowerDesign"
      placeholder="Пожелания по оформлению"
      hidden={watchField}
    />
  </>
);

export default ExtraQuestions;
