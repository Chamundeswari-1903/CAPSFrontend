import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useCycle } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import CartPanel from "../../cart";

const HeaderCart = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate()

  const handleCartClick = () => {
    navigate('/cart')
  };
 
  return (
    <div>
      <motion.span
      
        className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center"
        onClick={handleCartClick}
        >
        <Icon icon="heroicons:shopping-cart" />
        <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
         {cart.length}
        </span>
      </motion.span>
      
    </div>
  );
};

export default HeaderCart;
