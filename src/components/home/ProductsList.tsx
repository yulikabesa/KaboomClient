import React, { useEffect, useRef } from "react";
import classes from "./ProductList.module.css";
import ProductDisplay from "./ProductDisplay";
import defaultCover from "../../assets/defaultCoverPhoto.png";
import type { Area, Point } from "react-easy-crop";
import type { permissionType } from "../create/Settings/Settings";

export type questionType = {
  _id: string;
  questionText: string;
  answerOptions: string[];
  correctIndexes: number[];
  scoringWeight: number;
  timeLimit: number;
  questionImage?: questionImageType;
};

export type questionImageType = {
  image?: string;
  src?: string;
  crop?: Point;
  zoom?: number;
  croppedAreaPixels?: Area | null;
};

export type sharedWithType = {
  permission: permissionType;
  user: {
    _id: string;
    name: string;
    email: string;
  };
};

export type productType = {
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
      {!props.isLoading
        ? props.products.map((product, index) => (
            <div className={classes.reveal} key={index}>
              <ProductDisplay
                isLoading={false}
                product={product}
              />
            </div>
          ))
        : Array.from({ length: 5 }, (_, i) => (
            <div key={i}>
              <ProductDisplay
                isLoading={true}
                product={{
                  coverImage: defaultCover,
                  owner: "",
                  title: "",
                  questions: [],
                  sharedWith: [],
                  tags: [],
                  _id: "",
                }}
              />
            </div>
          ))}
    </div>
  );
};

export default ProductsList;
