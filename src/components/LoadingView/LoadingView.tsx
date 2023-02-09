import React from "react";
import { useAppSelector } from "../../redux/hook";
import ReactLoading from "react-loading";

const LoadingView: React.FC = () => {
  const loading = useAppSelector((state) => state.loading.loading);
  return (
    <div>
      {loading && (
        <ReactLoading
          type={"balls"}
          color={"#1f6feb"}
          height={667}
          width={375}
        />
      )}
    </div>
  );
};

export default LoadingView;