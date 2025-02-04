import React, { useEffect, useState } from "react";
import ProductCard from "../components/card/ProductCard"; // การ์ดสินค้า
import useEcomStore from "../store/ecom-store"; // Zustand Store
import SearchCard from "../components/card/SearchCard"; // ค้นหาสินค้า

const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct); 
  const products = useEcomStore((state) => state.products); 
  const [page, setPage] = useState(1); // หน้าปัจจุบัน
  const [limit] = useState(20); // จำนวนสินค้าต่อหน้า

  useEffect(() => {
    getProduct({ page, limit }); // ดึงข้อมูลสินค้าตามหน้า
  }, [page]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 p-4 bg-gray-100 h-screen">
        <SearchCard />
      </div>

      {/* สินค้า */}
      <div className="flex-1 p-4 h-screen overflow-y-auto">
        <p className="text-2xl font-bold mb-4 text-center">สินค้าทั้งหมด</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-500"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-white">{page}</span>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-500"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shop;
