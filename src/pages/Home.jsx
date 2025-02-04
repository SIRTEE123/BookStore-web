import React from "react";
import ContentCarousel from "../components/home/ContentCarousel"; // แสดง Carousel
import BestSeller from "../components/home/BestSeller"; // สินค้าขายดี
import NewProduct from "../components/home/NewProduct"; // สินค้าใหม่

const Home = () => {
  return (
    <div className="p-4">
      {/* Carousel */}
      <ContentCarousel />

      {/* สินค้าขายดี */}
      <p className="text-2xl font-bold text-center my-6">สินค้าขายอย่าง</p>
      <BestSeller />

      {/* สินค้าใหม่ */}
      <p className="text-2xl font-bold text-center my-6">สินค้าใหม่</p>
      <NewProduct />
    </div>
  );
};

export default Home;
