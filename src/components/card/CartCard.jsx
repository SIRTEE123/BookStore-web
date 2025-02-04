import React from "react";
import useEcomStore from "../../store/ecom-store"; // ดึงข้อมูลสินค้า

const Shop = () => {
  const products = useEcomStore((state) => state.products); // ดึงรายการสินค้า

  return (
    <div className="container mx-auto py-4">
      {/* หัวข้อ */}
      <h1 className="text-2xl font-bold mb-6 text-center">สินค้าทั้งหมด</h1>

      {/* แสดงสินค้าในรูปแบบ Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-md p-4 shadow-md flex flex-col items-center"
          >
            {/* รูปสินค้า */}
            <img
              src={
                product.image ||
                "https://via.placeholder.com/150"
              }
              alt={product.name || "No Image"}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            {/* รายละเอียดสินค้า */}
            <p className="font-bold text-center">{product.name || "No Name"}</p>
            <p className="text-sm text-gray-500 text-center mb-2">
              {product.description || "No Description"}
            </p>
            <p className="text-blue-500 font-bold text-center mb-4">
              ฿{product.price || "0"}
            </p>
            {/* ปุ่มเพิ่มลงตะกร้า */}
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              onClick={() => {
                // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
                useEcomStore.getState().actionAddToCart(product);
              }}
            >
              เพิ่มลงตะกร้า
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
