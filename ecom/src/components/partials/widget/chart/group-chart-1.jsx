import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { API } from "../../../../host";

const GroupChart1 = () => {
  const [adminCount, setAdminCount] = useState(0);

  const fetchData = async () => {
    try {
      const AdminResponse = await axios.get(`${API}/taxall`);
      if (AdminResponse.status === 200) {
        setAdminCount(AdminResponse.data.length);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div
        className={`py-[18px] px-4 rounded-[6px] bg-[#e0ecad] dark:bg-slate-900 `}
      >
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <div className="flex-1">
            <div className="text-slate-800 dark:text-slate-900 text-sm mb-1 font-medium">
              Purchased Happy Customers
            </div>
            <div className="text-slate-900 dark:text-white text-lg font-medium">
              {adminCount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupChart1;
