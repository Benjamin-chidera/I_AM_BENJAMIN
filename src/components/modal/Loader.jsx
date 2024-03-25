import React from "react";
import {Bars} from "react-loader-spinner"

export const Loader = () => {
  return (
    <Bars
      height="40"
      width="40"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
