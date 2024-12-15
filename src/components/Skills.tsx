"use client";
import React, { useState, useEffect, useRef } from "react";
import { fetchSkills } from "@/utils/backend";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import { twJoin, twMerge } from "tailwind-merge";

gsap.registerPlugin(ScrollTrigger);

interface Technology {
  _id: string;
  name: string;
  image: string;
}

interface Skill {
  _id: string;
  technologies: Technology[];
}

const HorizontalScrollSkills: React.FC = () => {
  const [skills, setSkills] = useState<Technology[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const movingContainer = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline | undefined>(undefined);

  useEffect(() => {
    const loadSkills = async () => {
      setLoading(true);
      try {
        const data: Skill[] = await fetchSkills();
        const technologies = data.flatMap((skill) => skill.technologies);
        setSkills(technologies);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  useEffect(() => {
    const setupInfiniteMarqueeTimeline = () => {
      gsap.set(movingContainer.current, {
        xPercent: 0,
      });
      timeline.current = gsap
        .timeline({
          defaults: { ease: "none", repeat: -1 },
        })
        .to(movingContainer.current, {
          xPercent: -50,
          duration: 20,
        })
        .set(movingContainer.current, { xPercent: 0 });
    };

    setupInfiniteMarqueeTimeline();
  }, [skills]);

  const timelineTimeScaleTween = useRef<GSAPTween | undefined>(undefined);

  const onPointerEnter = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 0.25,
      duration: 0.4,
    });
  };

  const onPointerLeave = () => {
    if (!timeline.current) return;
    timelineTimeScaleTween.current?.kill();
    timelineTimeScaleTween.current = gsap.to(timeline.current, {
      timeScale: 1,
      duration: 0.2,
    });
  };

  return (
    <section>
      <h1 className="heading">
        My Strong Skills <span className="text-purple">Sets</span>
      </h1>
      {loading ? (
        <div className="flex justify-center items-center space-x-4">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-32 h-32 bg-gray-300 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
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
            {skills.map((technology, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-32 h-32 overflow-hidden rounded-xl border-2 border-gray-300 p-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Image
                  src={technology.image}
                  alt={technology.name}
                  width={128} // Width corresponding to w-32
                  height={128} // Height corresponding to h-32
                  style={{ objectFit: "cover" }} // Maintain aspect ratio with contain
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-sm">
                    {technology.name}
                  </span>
                </div>
              </div>
            ))}
            {skills.map((technology, index) => (
              <div
                key={index + skills.length}
                className="group relative flex-shrink-0 w-32 h-32 overflow-hidden rounded-xl border-2 border-gray-300 p-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Image
                  src={technology.image}
                  alt={technology.name}
                  width={128} // Width corresponding to w-32
                  height={128} // Height corresponding to h-32
                  style={{ objectFit: "cover" }} // Maintain aspect ratio with contain
                  priority
                  sizes="(max-width: 768px) 100vw, 33vw" // Responsive sizes
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-sm">
                    {technology.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {loading && <div className="text-center mt-4">Loading...</div>}
        </div>
      )}
    </section>
  );
};

export default HorizontalScrollSkills;
