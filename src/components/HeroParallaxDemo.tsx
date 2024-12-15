"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/utils/types";
import { HeroParallax } from "./ui/hero-parallax";
import { fetchProjects } from "@/utils/backend";
import SkeletonLoader from "./ui/SkeletonLoader";

export default function HeroParallaxDemo() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectsData = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data || []);
      } catch (error) {
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, []);

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const featuredProjects = projects.filter((project) => project.featured);

  if (!featuredProjects.length) {
    return <div>No featured projects available.</div>;
  }

  const products = featuredProjects.map((project) => ({
    title: project.title,
    link: `/project/${project._id}`,
    thumbnail: project.media[0]?.url || "",
  }));

  return <HeroParallax products={products} />;
}
