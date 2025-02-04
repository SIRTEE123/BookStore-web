import React, { useEffect, useState } from "react";
import { listProductBy } from "../../api/product"; // API สำหรับดึงข้อมูลสินค้า
import ProductCard from "../card/ProductCard"; // การ์ดสินค้า
import SwiperShowProduct from "../../utils/SwiperShowProduct"; // ตัวเลื่อน Swiper
import { SwiperSlide } from "swiper/react"; // สไลด์ของ Swiper

const NewProduct = () => {
  const [data, setData] = useState([]); // สถานะสำหรับเก็บสินค้าใหม่

  useEffect(() => {
    loadData(); // โหลดข้อมูลสินค้าใหม่เมื่อ component ถูก mount
  }, []);

  const loadData = () => {
    listProductBy("updatedAt", "desc", 12) // ดึงข้อมูลสินค้าเรียงตามวันที่อัปเดตล่าสุด
      .then((res) => {
        setData(res.data); // เก็บข้อมูลสินค้าใน state
      })
      .catch((err) => {
        console.log(err); // แสดงข้อผิดพลาดใน console
      });
  };

  return (
    <SwiperShowProduct>
      {data?.map((item, index) => (
        <SwiperSlide key={index}> {/* ใช้ SwiperSlide สำหรับการ์ดแต่ละใบ */}
          <ProductCard item={item} /> {/* แสดงการ์ดสินค้า */}
        </SwiperSlide>
      ))}
    </SwiperShowProduct>
  );
};

export default NewProduct;
