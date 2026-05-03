import React, { useEffect, useRef } from "react";
import classes from "./ProductList.module.css";
import ProductDisplay from "./ProductDisplay";
import defaultCover from "../assets/defaultCoverPhoto.png";

export type questionType = {
  questionText: string;
  answerOptions: string[];
  correctIndexes: number[];
  scoringWeight: number;
  timeLimit: number;
  _id?: string;
  questionImage? : string;
};

type sharedWithType = {
  permission: string;
  user: string;
  _id: string;
};

type productType = {
  coverImage: string;
  owner: string;
  title: string;
  questions: questionType[];
  sharedWith: sharedWithType[];
  tags: string[];
  _id: string;
};

const ProductsList: React.FC<{
  products: productType[];
  isLoading: boolean;
}> = (props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(
      `.${classes.reveal}`,
    );

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(classes.active);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [props.products]);

  return (
    <div ref={containerRef} className={classes["product-list"]}>
      {props.products.map((product, index) => (
        <div className={classes.reveal} key={index}>
          <ProductDisplay
            isLoading={false}
            // todo change cover image to product.something
            coverImage={defaultCover}
            course="קורס"
            questionsNum={product.questions?.length}
            title={product.title}
            productId={product._id}
            questions={product.questions}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
