import React from "react";
import classes from "./ProductList.module.css";
import ProductDisplay from "./productDisplay";

const ProductsList: React.FC<{ products: number[] }> = (props) => {
  //  todo change products type for the product picture, question number, title and course
  return (
    <div className={classes["product-list"]}>
      {props.products.map((product, index) => (
        <div>
          <ProductDisplay key={index} isLoading={true} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
