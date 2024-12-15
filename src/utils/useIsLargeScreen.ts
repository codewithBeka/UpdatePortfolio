"use client"

import { useEffect, useState } from "react";

const useIsLargeScreen = (threshold: number): boolean => {
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > threshold);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [threshold]);

  return isLargeScreen;
};

export default useIsLargeScreen;