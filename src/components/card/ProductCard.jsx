import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { motion } from "framer-motion";

const ProductCard = ({ item }) => {
  const actionAddtoCart = useEcomStore((state) => state.actionAddtoCart);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (item) => {
    actionAddtoCart(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      {/* ป้ายลดราคา */}
      {item.discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          ลด {item.discount}%
        </span>
      )}

      {/* รูปสินค้า */}
      <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
        {item.images && item.images.length > 0 ? (
          <img
            src={item.images[0].url}
            alt={item.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* ชื่อสินค้า */}
      <div className="flex-1 mt-3">
        <h3 className="text-base font-medium text-gray-800 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {item.description || "ไม่มีคำอธิบาย"}
        </p>
      </div>

      {/* ราคาและปุ่ม */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-blue-600">
            {numberFormat(item.price)} บาท
          </span>
          {item.discount && (
            <span className="text-xs text-gray-400 line-through ml-2">
              {numberFormat(item.originalPrice)} บาท
            </span>
          )}
        </div>
        <motion.button
          onClick={() => handleAddToCart(item)}
          className={`flex items-center space-x-2 px-3 py-1 rounded-md shadow-md transition-all duration-300 ${
            isAdded ? "bg-green-500 text-white" : "bg-blue-500 text-white"
          } hover:scale-105`}
          whileTap={{ scale: 1.1 }}
        >
          {isAdded ? (
            <>
              <Check size={14} />
              <span className="text-xs">เพิ่มแล้ว</span>
            </>
          ) : (
            <>
              <ShoppingCart size={14} />
              <span className="text-xs">เพิ่มในตะกร้า</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
