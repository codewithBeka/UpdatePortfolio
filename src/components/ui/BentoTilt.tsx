"use client";
import React, { useState, useRef, ReactNode, MouseEvent } from "react";

interface BentoTiltProps {
  children: ReactNode;
  className?: string;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = "",
}) => {
  const [transformStyle, setTransformStyle] = useState<string>("");
  const itemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (itemRef.current) {
      const { clientX, clientY } = event;
      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();
      const offsetX = clientX - left; // Calculate X offset
      const offsetY = clientY - top; // Calculate Y offset
      const x = (offsetX / width) * 2 - 1; // Normalize to [-1, 1]
      const y = (offsetY / height) * 2 - 1; // Normalize to [-1, 1]
      setTransformStyle(`rotateY(${x * 10}deg) rotateX(${y * -10}deg)`);
    }
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};
