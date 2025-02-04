import React, { useEffect } from "react";
import Header from "../components/Header"; // นำเข้า Header ที่สร้าง
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Header /> {/* เพิ่ม Header ที่ค้างอยู่ด้านบน */}
      <div className="flex pt-20"> {/* เพิ่ม padding-top เพื่อให้เนื้อหาไม่ทับ Header */}
        {/* Sidebar สำหรับค้นหา */}
        <div className="w-1/4 p-4 bg-gray-100 h-screen">
          <SearchCard />
        </div>

        {/* พื้นที่แสดงสินค้า */}
        <div className="flex-1 p-4 h-screen overflow-y-auto">
          <p className="text-2xl font-bold mb-4 text-center">สินค้าทั้งหมด</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
