import React, { useEffect, useRef } from "react";
import classes from "./ProductList.module.css";
import ProductDisplay from "./ProductDisplay";

const ProductsList: React.FC<{ products: number[] }> = (props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(
      `.${classes.reveal}`
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
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [props.products]);

  return (
    <div ref={containerRef} className={classes["product-list"]}>
      {props.products.map((product, index) => (
        <div className={classes.reveal} key={index}>
          <ProductDisplay isLoading={true} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;