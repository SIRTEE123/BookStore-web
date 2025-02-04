import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useEcomStore from "../store/ecom-store";
import { FaShoppingCart } from "react-icons/fa";
import { ChevronDown, Trash2, X } from "lucide-react";
import { numberFormat } from "../utils/number";
import logo from "../assets/BookSTo2.png"; // นำเข้ารูปภาพโลโก้

const MainNav = () => {
  const carts = useEcomStore((s) => s.carts);
  const user = useEcomStore((s) => s.user);
  const logout = useEcomStore((s) => s.logout);
  const actionUpdateQuantity = useEcomStore((s) => s.actionUpdateQuantity);
  const actionRemoveProduct = useEcomStore((s) => s.actionRemoveProduct);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const cartRef = useRef(null);
  const profileRef = useRef(null);

  const toggleCartDropdown = () => {
    setIsCartOpen(!isCartOpen);
    setIsProfileOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsCartOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cartRef.current &&
        !cartRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsCartOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const totalPrice = carts.reduce((total, item) => total + item.price * item.count, 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
      <Link to="/" className="text-2xl font-bold">
  <img
    src="/src/assets/ccf.png" // เปลี่ยน path เป็นตำแหน่งที่คุณบันทึกรูป
    alt="BookStore"
    className="h-20" // ปรับขนาดโลโก้ตามต้องการ
  />
</Link>

        <div className="flex items-center gap-6">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
            }
            to="/"
            onClick={() => setIsCartOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-gray-200 px-3 py-2 rounded-md text-sm font-medium"
                : "hover:bg-slate-200 px-3 py-2 rounded-md text-sm font-medium"
            }
            to="/shop"
            onClick={() => setIsCartOpen(false)}
          >
            Shop
          </NavLink>
        </div>

        <div className="relative flex items-center gap-6">
          <button
            onClick={toggleCartDropdown}
            className="relative flex items-center hover:text-gray-500"
          >
            <FaShoppingCart size={24} />
            {carts.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {carts.reduce((total, item) => total + item.count, 0)}
              </span>
            )}
          </button>

          {isCartOpen && (
            <div
              ref={cartRef}
              className="absolute top-12 right-16 bg-white shadow-lg rounded-md w-[500px] z-50"
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-bold">รายการสินค้าของฉัน</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                {carts.length > 0 ? (
                  carts.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-2 mb-2"
                    >
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0].url
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.title || "No Image"}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="flex-grow">
                        <p className="font-bold">{item.title || "No Title"}</p>
                        <p className="text-sm text-gray-500">
                          {item.description || "No Description"}
                        </p>
                      </div>
                      <div className="border rounded-sm px-2 py-1 flex items-center">
                        <button
                          onClick={() =>
                            actionUpdateQuantity(item.id, Math.max(item.count - 1, 1))
                          }
                          className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-500"
                          disabled={item.count <= 1}
                        >
                          -
                        </button>
                        <span className="px-4">{item.count}</span>
                        <button
                          onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                          className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-500"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm font-bold">฿{numberFormat(item.price * item.count)}</p>
                      <button
                        onClick={() => actionRemoveProduct(item.id)}
                        className="text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">ไม่มีสินค้าในตะกร้า</p>
                )}
              </div>
              <div className="p-4 border-t">
                <div className="flex justify-between font-bold">
                  <span>ยอดรวมทั้งหมด</span>
                  <span>฿{numberFormat(totalPrice)}</span>
                </div>
              </div>
              <div className="p-4">
                <NavLink
                  to="/cart"
                  className="block w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-medium"
                  onClick={() => setIsCartOpen(false)}
                >
                  ไปหน้าชำระเงิน
                </NavLink>
              </div>
            </div>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 hover:text-gray-500"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{
                    backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                  }}
                >
                  {user.email ? user.email[0].toUpperCase() : "U"}
                </div>
                <ChevronDown />
              </button>
              {isProfileOpen && (
                <div
                  ref={profileRef}
                  className="absolute top-12 right-0 bg-white shadow-lg rounded-md w-48 z-50"
                >
                  <NavLink
                    to="/user/history"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    ประวัติการสั่งซื้อ
                  </NavLink>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="hover:text-gray-500 text-sm font-medium">
              เข้าสู่ระบบ
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
