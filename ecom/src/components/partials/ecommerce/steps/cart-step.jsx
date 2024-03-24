import React, { useState } from "react";
import Icon from "../../../ui/Icon";
import { useSelector } from "react-redux";
import { API } from "../../../../host";
import { removeFromCart } from "../../../../store/api/shop/cartslice";
import { useDispatch } from "react-redux";

const CartStep = () => {
  const items = useSelector((state) => state.cart);
  // console.log(items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (_id) => {
    dispatch(removeFromCart({ _id }));
  };

  const [quantities, setQuantities] = useState({});

  const handleIncrease = (product_id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product_id]: (prevQuantities[product_id] || 0) + 1,
    }));
  };

  const handleDecrease = (product_id) => {
    if (quantities[product_id] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product_id]: prevQuantities[product_id] - 1,
      }));
    }
  };

  const totalPrice = items.reduce((total, item) => {
    return total + item.productcost * (quantities[item._id] || 1);
  }, 0);

  return (
    <div className="bg-white dark:bg-slate-800 space-y-7">
      <div className="overflow-x-auto border-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
              <thead className=" border-0 border-slate-100 dark:border-slate-800">
                <tr>
                  <th scope="col" className=" table-th  ">
                    Product
                  </th>
                  <th scope="col" className=" table-th ">
                    Price
                  </th>
                  <th scope="col" className=" table-th ">
                    Quantity
                  </th>
                  <th scope="col" className=" table-th ">
                    Total
                  </th>
                  <th scope="col" className=" table-th ">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {items.length > 0 ? (
                  items?.map((item, i) => (
                    <tr key={i}>
                      <td className="table-td flex items-center space-x-3 pb-3">
                        <div className="md:p-4 p-2 flex-none bg-slate-200 rounded md:h-20 md:w-20 w-16 h-16 rtl:ml-3">
                          <img
                            className="w-full h-full object-contain"
                            src={`${API}/${item.productimage}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-slate-300 md:text-base text-sm font-medium md:pb-2 pb-1 md:w-[380px] w-[150px] truncate">
                            {item.product_name}
                          </p>
                        </div>
                      </td>
                      <td className="table-td pb-3">Rs.{item.productcost}</td>
                      <td className="table-td pb-3">
                        <div className="flex-1 h-8 md:min-w-[112px] min-w-[95px] flex border border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600 rounded">
                          <button
                            className="md:px-3 px-2 disabled:cursor-not-allowed"
                            onClick={() => handleDecrease(item._id)}
                          >
                            <Icon icon="eva:minus-fill" />
                          </button>
                          <span className="flex-1 text-xs text-center flex items-center justify-center">
                            {quantities[item._id] || 1}
                          </span>
                          <button
                            className="md:px-3 px-2 disabled:cursor-not-allowed"
                            onClick={() => handleIncrease(item._id)}
                          >
                            <Icon icon="eva:plus-fill" />
                          </button>
                        </div>
                      </td>
                      <td className="table-td pb-3">
                        Rs.
                        {item.productcost * quantities[item._id] ||
                          item.productcost}
                      </td>
                      <td className="table-td pb-3">
                        <button
                          onClick={() => handleRemoveFromCart(item._id)}
                          className="bg-slate-100 text-slate-400 p-2.5  mb-1.5 rounded-full hover:bg-red-200   hover:text-red-600  "
                        >
                          <Icon icon="heroicons:trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="table-td text-center h-24 " colSpan="5">
                      No result's
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot className="mx-6">
                <tr className="border-t dark:border-slate-700  ">
                  <td className="table-td " colSpan="4">
                    <p className="md:text-base text-sm font-medium text-slate-500 dark:text-slate-400">
                      Subtotal:
                    </p>
                  </td>
                  <td className="table-td">
                    <p className="md:text-base text-sm font-medium text-slate-900 dark:text-slate-300">
                      ${totalPrice}
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStep;
