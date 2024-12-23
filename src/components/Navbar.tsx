"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import MobileNavLink from "./ui/MobileNavLink";

type Props = {};

function Navbar({}: Props) {
  const [isToggleMenu, setIsToggleMenu] = useState(false);

  const navData = [
    { id: 1, title: "Home", href: "/" },
    { id: 5, title: "Service", href: "#service" },
    { id: 2, title: "About", href: "#about" },
    { id: 3, title: "Projects", href: "#projects" },
    { id: 4, title: "Contact", href: "#contact" },
  ];
  const toggleMenu = () => {
    setIsToggleMenu((prevOpen) => !prevOpen);
    console.log("yes");
  };
  const closeMenu = () => {
    setIsToggleMenu(false);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <header className="bg-transparent py-5 px-4  top-0 fixed w-full z-50 ">
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={48} // Set the desired width (12 * 4)
            height={48} // Set the desired height (12 * 4)
            className="object-contain h-12 w-12 rounded-full"
            loading="lazy"
          />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Bereket &nbsp;
            <span className="sm:block hidden"> | Mega Tech</span>
          </p>
        </Link>

        <div>
          <button
            onClick={toggleMenu}
            className={`text-bruno-yellow text-white  z-10 text-xl duration-500  ${
              isToggleMenu ? "right-0" : "-right-96"
            }`}
          >
            {isToggleMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isToggleMenu && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 z-100 w-full h-screen origin-top bg-yellow-400 text-black p-10"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <p className="text-black text-[18px] font-bold cursor-pointer flex ">
                  Bereket &nbsp;
                  <span className="sm:block hidden"> | Mega Tech</span>
                </p>{" "}
                <p
                  className="cursor-pointer text-md text-black"
                  onClick={toggleMenu}
                >
                  Close
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navData.map((link, index) => {
                  return (
                    <div key={link.id} className="overflow-hidden">
                      <MobileNavLink
                        key={index}
                        title={link.title}
                        href={link.href}
                        closeMenu={closeMenu}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
