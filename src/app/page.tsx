import About from "@/components/About";
import AboutMe from "@/components/AboutMe";
import AllProjects from "@/components/AllProjects";
import Approach from "@/components/Approach";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HeroParallaxDemo from "@/components/HeroParallaxDemo";
import { Service } from "@/components/Service";
import Marquee from "@/components/Skills";
import toast, { Toaster } from "react-hot-toast";

async function fetchCategories() {
  const res = await fetch(`https://codewithbeka.onrender.com/api/categories`, {
    cache: "force-cache", // Static fetch
    credentials: "include", // Include cookies and authentication data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  const data = await res.json();

  return data || [];
}

export default async function Home() {
  const categories = await fetchCategories();

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Toaster />
      <div className="max-w-7xl w-full">
        <Hero />
        <Service />
        {/* <HeroParallaxDemo /> */}
        <AboutMe />
        <Marquee />
        <AllProjects categories={categories} />
        <Clients />
        <Approach />
        <Contact />
        <Footer />
        {/*
         */}
      </div>
    </main>
  );
}
