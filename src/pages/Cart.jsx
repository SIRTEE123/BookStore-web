import React, { useState } from "react";
import ListCart from "../components/card/ListCart";

const Cart = () => {
  // สถานะสินค้าในตะกร้า
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "สินค้า A",
      price: 1000,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "สินค้า B",
      price: 2000,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "สินค้า C",
      price: 3000,
      quantity: 3,
      image: null, // ตัวอย่างสินค้าไม่มีรูป
    },
  ]);

  // ฟังก์ชันอัปเดตจำนวนสินค้า
  const updateQuantity = (id, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity } : product
      )
    );
  };

  // ฟังก์ชันลบสินค้า
  const removeProduct = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ตะกร้าสินค้าของคุณ</h1>
      <ListCart
        products={products}
        updateQuantity={updateQuantity}
        removeProduct={removeProduct}
      />
    </div>
  );
};

export default Cart;
