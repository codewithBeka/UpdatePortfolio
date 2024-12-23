// components/HorizontalScroll.tsx
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Technology {
  _id: string;
  name: string;
  image: string;
}

interface HorizontalScrollProps {
  skills: Technology[];
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ skills }) => {
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline | undefined>(undefined);

  useEffect(() => {
    gsap.set(movingContainer.current, { xPercent: 0 });

    timeline.current = gsap
      .timeline({ defaults: { ease: "none", repeat: -1 } })
      .to(movingContainer.current, { xPercent: -50, duration: 20 })
      .set(movingContainer.current, { xPercent: 0 });

    return () => {
      if (timeline.current) {
        timeline.current.kill(); // Cleanup on unmount
      }
    };
  }, [skills]);

  const onPointerEnter = () => {
    if (timeline.current) {
      gsap.to(timeline.current, { timeScale: 0.25, duration: 0.4 });
    }
  };

  const onPointerLeave = () => {
    if (timeline.current) {
      gsap.to(timeline.current, { timeScale: 1, duration: 0.2 });
    }
  };

  return (
    <div
      className={twMerge("max-w-full select-none overflow-hidden p-8")}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
      }}
    >
      <div
        ref={movingContainer}
        className="flex justify-center items-center w-fit space-x-4"
      >
        {skills.map((technology) => (
          <div
            key={technology._id}
            className="group relative flex-shrink-0 w-32 h-32 overflow-hidden rounded-xl border-2 border-gray-300 p-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Image
              src={technology.image}
              alt={technology.name}
              width={128}
              height={128}
              style={{ objectFit: "cover" }}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white font-semibold text-sm">
                {technology.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;