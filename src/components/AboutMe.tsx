"use client";
import Image from "next/image";
import { BentoTilt } from "./ui/BentoTilt";
import { WorldMap } from "./ui/world-map";
import worldCapitalDots from "@/lib/dot";
import Button from "./ui/Button";

const AboutMe = () => {
  return (
    <section className="c-space my-20" id="about">
      <h1 className="heading mb-[2rem]">
        About Me <span className="text-purple">Empowered Developer</span>
      </h1>
      <div className="grid  xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 mt-6 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 bg-transparent">
          <div
            className="grid-container"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <Image
              src="/m.jpeg"
              alt="grid-1"
              width={276}
              height={376}
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
              className="w-full sm:h-[276px] h-fit object-contain"
              priority
            />

            <div>
              <p className="grid-headtext">Hi, I’m Bereket Wale</p>
              <p className="grid-subtext">
                As an emerging developer, I bring a solid foundation in both
                frontend and backend technologies. I am dedicated to creating
                dynamic, responsive websites that deliver exceptional user
                experiences.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-3">
          <div
            className="grid-container"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <Image
              src="/mainIconsdark.svg"
              alt="grid-2"
              width={276}
              height={276}
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
              className="w-full sm:h-[276px] h-fit object-contain"
              priority
            />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I leverage a diverse array of languages, frameworks, and tools
                to craft robust and scalable applications that drive innovation
                and efficiency.
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 xl:row-span-4">
          <div
            className="grid-container flex flex-col items-center"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <div className="rounded-3xl  w-full   ">
              <WorldMap dots={worldCapitalDots} />
            </div>
            <div className="text-center">
              {" "}
              {/* Center text for better alignment */}
              <p className="grid-headtext">
                I am highly adaptable with time zone communications and
                locations.
              </p>
              <p className="grid-subtext">
                Currently based in Bahir Dar, Ethiopia, I am eager to embrace
                remote work opportunities worldwide.
              </p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>
        <div className="xl:col-span-2 xl:row-span-3">
          <div
            className="grid-container"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <Image
              src="/clean.jpeg"
              alt="grid-3"
              width={266} // Set the width to match the desired size
              height={366} // Set the height to match the desired size
              style={{ objectFit: "cover" }} // Maintain cover for filling the space
              className="w-full sm:h-[266px] h-fit object-contain" // Use Tailwind classes for responsiveness
            />

            <div>
              <p className="grid-headtext">My Passion for Clean Code</p>
              <p className="grid-subtext">
                I thrive on solving challenges and building innovative solutions
                through code. Programming is not just a profession—it's my
                passion. I take pride in writing clean, efficient code and
                continually explore new technologies to enhance my skills.
              </p>
            </div>
          </div>
        </div>
        <div className="xl:col-span-1 xl:row-span-2">
          <div
            className="grid-container"
            style={{
              //   add these two
              //   you can generate the color from here https://cssgradient.io/
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
            }}
          >
            <Image
              src="/grid4.png"
              alt="grid-4"
              width={276}
              height={276}
              style={{ objectFit: "cover", width: "auto", height: "auto" }}
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
              priority
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container">
                <Image
                  src="/copy.svg"
                  width={36}
                  height={36}
                  style={{ objectFit: "cover", width: "auto", height: "auto" }}
                  alt="copy"
                  priority
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  walebereket37@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
