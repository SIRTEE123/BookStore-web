import React from "react";
import { Trash2 } from "lucide-react"; // นำเข้าเฉพาะ Trash2
import useEcomStore from "../../store/ecom-store";
import { Link, useNavigate } from "react-router-dom";
import { createUserCart } from "../../api/user";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";

const ListCart = () => {
  const cart = useEcomStore((state) => state.carts);
  const user = useEcomStore((s) => s.user);
  const token = useEcomStore((s) => s.token);
  const getTotalPrice = useEcomStore((state) => state.getTotalPrice);
  const actionUpdateQuantity = useEcomStore((s) => s.actionUpdateQuantity);
  const actionRemoveProduct = useEcomStore((s) => s.actionRemoveProduct);

  const navigate = useNavigate();

  const handleSaveCart = async () => {
    await createUserCart(token, { cart })
      .then((res) => {
        console.log(res);
        toast.success("บันทึกใส่ตะกร้าเรียบร้อยแล้วจ้า", {
          position: "top-center",
        });
        navigate("/checkout");
      })
      .catch((err) => {
        console.log("err", err);
        toast.warning(err.response.data.message);
      });
  };

  return (
    <div className="bg-gray-100 rounded-sm p-4">
      {/* Header */}
      <div className="flex gap-4 mb-4">
        <p className="text-2xl font-bold">รายการสินค้า {cart.length} รายการ</p>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left */}
        <div className="col-span-2">
          {/* Card */}
          {cart.map((item) => (
            <div key={item.id} className="bg-white p-2 rounded-md shadow-md mb-2">
              {/* Row 1 */}
              <div className="flex justify-between items-center">
                {/* Left */}
                <div className="flex gap-2 items-center">
                  {item.images && item.images.length > 0 ? (
                    <img
                      className="w-16 h-16 rounded-md"
                      src={item.images[0].url}
                      alt={item.title}
                    />
                  ) : (
                    <div
                      className="w-16 h-16 bg-gray-200 
                            rounded-md flex text-center items-center"
                    >
                      No Image
                    </div>
                  )}

                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm">{numberFormat(item.price)} บาท</p>
                  </div>
                </div>
                {/* Right */}
                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-sm">
                    <button
                      onClick={() =>
                        actionUpdateQuantity(item.id, Math.max(item.count - 1, 1))
                      }
                      className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
                      disabled={item.count <= 1}
                    >
                      -
                    </button>
                    <span className="px-4">{item.count}</span>
                    <button
                      onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  {/* Total Price */}
                  <p className="text-sm font-bold text-blue-500">
                    {numberFormat(item.price * item.count)} บาท
                  </p>
                  {/* Delete Icon */}
                  <button
                    onClick={() => actionRemoveProduct(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right */}
        <div className="bg-white p-4 rounded-md shadow-md space-y-4">
          <p className="text-2xl font-bold">ยอดรวม</p>
          <div className="flex justify-between">
            <span>รวมสุทธิ</span>
            <span className="text-2xl font-bold">
              {numberFormat(getTotalPrice())}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {user ? (
              <Link>
                <button
                  disabled={cart.length < 1}
                  onClick={handleSaveCart}
                  className="bg-red-500 w-full
                    rounded-md text-white py-2 shadow-md hover:bg-red-700"
                >
                  สั่งซื้อ
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button
                  className="bg-blue-500 w-full
                    rounded-md text-white py-2 shadow-md hover:bg-blue-700"
                >
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
