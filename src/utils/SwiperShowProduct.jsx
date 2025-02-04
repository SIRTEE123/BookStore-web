import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";

const SwiperShowProduct = ({ children }) => {
  return (
    <Swiper
      slidesPerView={6} // จำนวนการ์ดที่แสดงในหน้าจอใหญ่
      spaceBetween={20} // ระยะห่างระหว่างการ์ด
      pagination={{ clickable: true }} // เปิด Pagination ให้สามารถคลิกได้
      navigation={true} // เพิ่มปุ่มเลื่อนซ้าย-ขวา
      modules={[Pagination, Autoplay, Navigation]} // ใช้งาน Pagination, Autoplay, Navigation
      autoplay={{
        delay: 3500, // เลื่อนอัตโนมัติทุก 2.5 วินาที
        disableOnInteraction: false, // ไม่หยุดเลื่อนเมื่อผู้ใช้โต้ตอบ
      }}
      breakpoints={{
        320: {
          slidesPerView: 2, // แสดง 2 การ์ดในหน้าจอมือถือ
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 3, // แสดง 3 การ์ดในหน้าจอแท็บเล็ต
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 4, // แสดง 4 การ์ดในหน้าจอแท็บเล็ตใหญ่
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5, // แสดง 5 การ์ดในหน้าจอเดสก์ท็อป
          spaceBetween: 25,
        },
        1280: {
          slidesPerView: 6, // แสดง 6 การ์ดในหน้าจอเดสก์ท็อปกว้าง
          spaceBetween: 30,
        },
      }}
      className="mySwiper object-cover rounded-md"
    >
      {children}
    </Swiper>
  );
};

export default SwiperShowProduct;
