"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

type Props = {
  testimonials: any[]; // Adjust type according to your testimonials structure
  isLoading?: boolean;
  error?: string;
};

const Clients: React.FC<Props> = ({ testimonials, isLoading, error }) => {
  if (isLoading) {
    return (
      <section id="testimonials" className="py-20">
        <h1 className="heading">
          Kind words from
          <span className="text-purple"> satisfied clients</span>
        </h1>
        <div className="flex flex-col items-center max-lg:mt-10">
          <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col items-center justify-center relative overflow-hidden">
            {/* Skeleton loaders */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="w-80 h-24 bg-gray-300 rounded-lg animate-pulse m-2"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="testimonials" className="py-20">
        <h1 className="heading">
          Kind words from
          <span className="text-purple"> satisfied clients</span>
        </h1>
        <div className="flex flex-col items-center max-lg:mt-10">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
};

export default Clients;
