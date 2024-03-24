import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../../../host";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const InvoiceCart = ({ token }) => {
  const items = useSelector((state) => state.cart);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const decodedToken = jwtDecode(token);
  const decodedEmail = decodedToken.email;
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${API}/getemail?email=${decodedEmail}`
        );
        const responseData = response.data;
        setUserData([responseData]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  });

  const subcalculateTotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.productcost * 2;
    });
    return subtotal;
  };

  const calculateTax = () => {
    const subtotal = subcalculateTotal();
    return subtotal * 0.03;
  };

  const calculateFinalTotal = () => {
    const subtotal = subcalculateTotal();
    const tax = calculateTax();
    const shipping = 250;
    const total = subtotal + tax + shipping;
    return Math.round(total);
  };

  const generateOrderCode = () => {
    const timestamp = Date.now().toString(36); // Convert current time to base36 string
    const randomString = Math.random().toString(36).substring(2, 7); // Generate random string
    return timestamp + "-" + randomString; // Concatenate timestamp and random string
  };

  const [orderCode, setOrderCode] = useState(generateOrderCode());

  const handlePostOrder = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getFullYear()}`;

      const postData = {
        cus_id: userData[0].userid,
        name: userData[0].fname,
        trans: orderCode,
        date: formattedDate,
        status: "paid",
      };

      const response = await axios.post(`${API}/tax`, postData);
      console.log("Order Posted Successfully:", response.data);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error posting order:", error);
    }
  };

  return (
    <div className="p-6">
      {userData?.map((data, i) => (
        <div>
          <div className="text-center mb-8" key={i}>
            <h4 className="text-slate-900 dark:text-slate-300 text-2xl font-medium pb-4">
              Thank You for Your Order!
            </h4>
            <p className="text-slate-900 dark:text-slate-300 text-base font-normal">
              A copy or your order summary has been sent to
              <span className=" dark:text-slate-400 text-base font-medium ml-1 cursor-pointer">
                {data.email}
              </span>
            </p>
          </div>

          <div className="border dark:border-slate-700 p-3 lg:p-6 rounded">
            <p className="text-slate-900 dark:text-slate-300 text-base font-medium pb-3 border-b dark:border-slate-700 mb-4">
              Order Summary
            </p>
            <div className=" md:flex md:space-x-3 lg:space-x-5 space-y-3">
              <div className="flex-1">
                <div className="flex space-x-2 lg:space-x-12 rtl:space-x-reverse">
                  <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                    <p>Order Phone No:</p>
                    <p>Name:</p>
                    <p>Email:</p>
                    <p>Shipping address:</p>
                  </div>
                  <div className="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 min-w-[110px] ">
                    <p>{data.phone}</p>
                    <p>{data.fname}</p>
                    <p>{data.email}</p>
                    <p>{data.fname}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex space-x-2 lg:space-x-12 rtl:space-x-reverse">
                  <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                    <p>Order Status:</p>
                    <p>Total order amount:</p>
                    <p>Shipping:</p>
                    <p>Payment method:</p>
                  </div>
                  <div className=" font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 min-w-[110px] ">
                    <p>success</p>
                    <p> Rs.{calculateFinalTotal()}</p>
                    <p>Flat shipping rate</p>
                    <p>Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="py-12 text-center lg:text-2xl text-xl font-normal text-slate-900 dark:text-slate-300">
        Order Code:{" "}
        <span className="lg:text-2xl text-xl font-medium">{orderCode}</span>
      </div>
      <div className="p-3 md:p-6 rounded">
        <p className="text-slate-900 dark:text-slate-300 text-base font-medium pb-3">
          Order Details
        </p>
        <div className="bg-white dark:bg-slate-800 space-y-7">
          <div className="overflow-x-auto border-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                  <thead className=" border-0 border-slate-00 dark:border-slate-700">
                    <tr>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pl-0 rtl:pr-0 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left "
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left	 "
                      >
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left	 "
                      >
                        Delivery Type
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pr-0 rtl:pl-0	ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left "
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    {items?.map((item, i) => (
                      <tr key={i}>
                        <td className="table-td flex items-center space-x-3 rtl:space-x-reverse pb-3 pl-0 rtl:pr-0 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <div className="md:p-4 p-2 flex-none bg-slate-200 rounded md:h-20 md:w-20 w-16 h-16 rtl:ml-3">
                            <img
                              className="w-full h-full object-contain"
                              src={`${API}/${item.productimage}`}
                              alt=""
                            />
                          </div>
                          <div>
                            <p className="text-slate-900 dark:text-slate-300 lg:text-base text-sm font-normal md:pb-2 pb-1 lg:w-[380px] w-[150px] truncate">
                              {item.productname}
                            </p>
                          </div>
                        </td>
                        <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          2
                        </td>
                        <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          Home Delivery
                        </td>
                        <td className="table-td pb-3  pr-0 rtl:pl-0 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          Rs. {item.productcost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="md:flex  lg:py-6 py-3  items-center justify-end border-t dark:border-slate-700 mt-3">
                  <div className="flex-none min-w-[270px] space-y-3">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Subtotal:
                        </span>
                        <span className="text-slate-900 dark:text-slate-300 font-medium text-xs lg:text-sm">
                          Rs.{subcalculateTotal()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          GST (3%):
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          Rs.{calculateTax().toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Shipping:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          Rs.250.00
                        </span>
                      </div>
                    </div>
                    <div className="border-t dark:border-slate-700 ">
                      <div className="flex justify-between pt-3">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          RoundOff Total:
                        </span>
                        <span className="text-slate-900 dark:text-slate-300 text-xs lg:text-sm">
                          Rs.{calculateFinalTotal()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handlePostOrder}
        className="btn btn-dark absolute end-0 mr-11 bottom-2"
      >
        Submit
      </button>
    </div>
  );
};

export default InvoiceCart;
