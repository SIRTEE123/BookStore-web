import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product"; // API สำหรับดึงข้อมูลสินค้า
import ProductCard from "../card/ProductCard"; // การ์ดสินค้า
import SwiperShowProduct from "../../utils/SwiperShowProduct"; // ตัวเลื่อน Swiper
import { SwiperSlide } from "swiper/react"; // สไลด์ของ Swiper

const BestSeller = () => {
  const [data, setData] = useState([]); // สถานะสำหรับเก็บสินค้าขายดี

  useEffect(() => {
    loadData(); // โหลดข้อมูลสินค้าขายดีเมื่อ component ถูก mount
  }, []);

  const loadData = () => {
    listProductBy("sold", "desc", 12) // ดึงข้อมูลสินค้าเรียงตามยอดขาย (จากมากไปน้อย)
      .then((res) => {
        setData(res.data); // เก็บข้อมูลสินค้าใน state
      })
      .catch((err) => {
        console.error("Error fetching best seller products:", err); // แสดงข้อผิดพลาดใน console
      });
  };

  return (
    <div className="mt-6">
      <SwiperShowProduct>
        {data?.map((item, index) => (
          <SwiperSlide key={index}> {/* ใช้ SwiperSlide สำหรับการ์ดแต่ละใบ */}
            <ProductCard item={item} /> {/* แสดงการ์ดสินค้า */}
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
    </div>
  );
};

export default BestSeller;
