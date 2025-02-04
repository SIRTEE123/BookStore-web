// rafce
import React from 'react';
import FormProduct from '../../components/admin/FormProduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  // ฟังก์ชันแจ้งเตือน
  const handleAddToCart = (productName) => {
    toast.success(`สินค้า ${productName} ถูกเพิ่มลงในตะกร้าแล้ว!`, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div>
      <FormProduct onAddToCart={handleAddToCart} />
      {/* ToastContainer สำหรับแสดงแจ้งเตือน */}
      <ToastContainer />
    </div>
  );
};

export default Product;
