import React from "react";
import ProductCard from "./ProductCard"; // นำเข้า ProductCard

const ProductsGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductsGrid;
