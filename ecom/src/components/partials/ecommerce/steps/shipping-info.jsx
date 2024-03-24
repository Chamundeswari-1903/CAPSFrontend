import React, { useState } from "react";
import Radio from "../../../ui/Radio";
import NoteModal from "./note-modal";
import Icons from "../../../ui/Icon";

const ShippingInfo = () => {
  const [value, setValue] = useState("A");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const [isOpen, setOpen] = useState(false);
  const handleToggleModal = () => {
    setOpen(!isOpen);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="bg-white dark:bg-slate-800">
        <div className=" rounded p-5 space-y-5">
          <div className=" border dark:border-slate-700 rounded  p-5">
            <label className="flex  ">
              <Radio
                name="x"
                value="B"
                checked={value === "B"}
                onChange={handleChange}
              />
              <div className="flex -mt-1 space-x-5 rtl:space-x-reverse">
                <div className="  min-w-[110px] md:text-base text-sm text-slate-500 dark:text-slate-400  space-y-1.5 ">
                  <p>Address:</p>
                  <p>City:</p>
                  <p>State:</p>
                  <p>Country:</p>
                  <p>Postal Code:</p>
                  <p>Phone No:</p>

                </div>
                <div className="  md:text-base text-sm text-slate-900 dark:text-slate-300  space-y-1.5 ">
                  <p>Amazon Industries</p>
                  <p>Tech Park</p>
                  <p>Chennai</p>
                  <p>Tamil Nadu</p>
                  <p>631032</p>
                  <p>9876543201</p>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <NoteModal activeModal={isOpen} onclose={handleCloseModal} />
    </>
  );
};

export default ShippingInfo;
