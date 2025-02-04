import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// Import required modules
import { Pagination, Autoplay } from "swiper/modules";

const ContentCarousel = () => {
  // Javascript
  const [data, setData] = useState([]);

  useEffect(() => {
    // ใช้รูปที่กำหนดเอง
    setData([
      { id: 1, download_url: "/src/assets/ai.webp" }, // รูปภาพของคุณ
      { id: 2, download_url: "/src/assets/hh.webp" },
      { id: 3, download_url: "/src/assets/gg.webp" },
      { id: 4, download_url: "/src/assets/en.webp" },
      { id: 5, download_url: "/src/assets/qq.webp" },
    ]);
  }, []);

  return (
    <div>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper h-80 object-cover rounded-md mb-4"
      >
        {data?.map((item, i) => (
          <SwiperSlide key={i}>
            <img
              src={item.download_url}
              alt={`Image ${i}`}
              className="w-full h-80 object-cover rounded-md" // ปรับขนาดรูปภาพ
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContentCarousel;
