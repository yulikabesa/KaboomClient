import React from "react";
import classes from './ProductList.module.css';
import ProductDisplay from "./productDisplay";

const ProductsList:React.FC<{products: number[]}> = (props) => {
  return (
    <div className={classes["product-list"]}>
      {props.products.map((product, index) => (
        <ProductDisplay key={index} isLoading={true} />
      ))}
    </div>
  );
};

export default ProductsList;
