import React from "react";

const HomeBredCurbs = ({ title }) => {
  return (
    <div className="flex justify-center flex-wrap items-center mb-6">
      <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
        {title } <span role="img" aria-label="Emoji">
        &#x1F973;  &#x1F973; &#x1F973; 
  </span>
      </h4>
    </div>
  );
};

export default HomeBredCurbs;
