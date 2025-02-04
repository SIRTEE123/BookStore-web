import React from "react";
import AppRoutes from "./routes/AppRoutes"; // ระบบเส้นทางของแอป
import Footer from "./components/Footer"; // เพิ่ม Footer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      {/* ToastContainer สำหรับแจ้งเตือน */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      {/* ส่วนเส้นทาง */}
      <AppRoutes />
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
