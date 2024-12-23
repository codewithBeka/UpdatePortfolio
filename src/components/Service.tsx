"use client";
import { ArrowBigDown, Code, Smartphone, Globe, Layout } from "lucide-react";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import ClipPath from "./ui/ClipPath ";
import { GradientLight } from "./ui/GradientLight";
import Image from "next/image";
import { BentoTilt } from "./ui/BentoTilt";

// Services data with icons and backgrounds
const services = [
  {
    id: "0",
    title: "Backend Developer",
    description:
      "Crafting scalable and efficient server-side solutions that power your applications. Let's build robust APIs and microservices together!",
    backgroundUrl: "/card-1.svg",
    icon: <Code size={48} style={{ color: "#4A90E2" }} />, // Code icon for backend development
    imageUrl: "/backend.jfif",
    light: true,
  },
  {
    id: "1",
    title: "Mobile App Developer",
    description:
      "Transforming your ideas into intuitive mobile experiences. I specialize in creating seamless apps for both iOS and Android platforms.",
    backgroundUrl: "/card-2.svg",
    icon: <Smartphone size={48} style={{ color: "#E94E77" }} />, // Mobile icon for mobile development
    imageUrl: "/phone.jfif",
  },
  {
    id: "2",
    title: "Web Developer",
    description:
      "Building responsive and interactive websites that engage users. From front to back, I ensure your web presence is polished and effective.",
    backgroundUrl: "/card-3.svg",
    icon: <Globe size={48} style={{ color: "#50E3C2" }} />, // Globe icon for web development
    imageUrl: "/web.jfif",
    light: true,
  },
  {
    id: "3",
    title: "Frontend Developer",
    description:
      "Designing user-friendly interfaces that captivate and retain users. Let's create stunning visuals and seamless interactions that enhance user experience.",
    backgroundUrl: "/card-4.svg",
    icon: <Layout size={48} style={{ color: "#F5A623" }} />, // Layout icon for frontend development
    imageUrl: "/front.jfif",
  },
];

export function Service() {
  return (
    <section className="c-space my-20" id="service">
      <h1 className="text-center mb-10 text-2xl md:text-3xl lg:text-6xl">
        My Services{" "}
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Backend",
            3000, // wait 1s before replacing "Mice" with "Hamsters"
            "Frontend",
            3000,
            "UI/UX",
            3000,
            "Mobile APP",
            3000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "1em", display: "inline-block", color: "#D397F8" }}
          repeat={Infinity}
        />
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-10 mt-6 mb-10">
        {services.map((item) => (
          <BentoTilt key={item.id} className="relative">
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${item.backgroundUrl})`,
              }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none">
                <h5 className="text-2xl leading-normal text-purple mb-5">
                  {item.title}
                </h5>
                <p className="body-2 mb-6 text-[#ADA8C3]">{item.description}</p>
                <div className="flex items-center mt-auto">
                  {item.icon}
                  <p className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider">
                    Explore more
                  </p>
                  <ArrowBigDown />
                </div>
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {item.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      width={380}
                      height={362}
                      alt={item.title}
                      style={{
                        objectFit: "cover",
                        width: "auto",
                        height: "auto",
                      }}
                      loading="lazy"
                      className="z-0 w-full h-auto object-cover"
                    />
                  )}
                </div>
              </div>

              <ClipPath />
            </div>
          </BentoTilt>
        ))}
      </div>
    </section>
  );
}
