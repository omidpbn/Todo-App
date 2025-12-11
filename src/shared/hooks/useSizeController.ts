import { useState, useEffect } from "react";

const useSizeController = (width: number = 640) => {
  const [innerWidth, setInnerWidth] = useState(width);
  const [innerHeight, setInnerHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call handler right away so state gets updated with initial window size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmall = innerWidth < width; // Adjust the breakpoint as needed

  return { innerWidth, isSmall, innerHeight };
};

export default useSizeController;
