"use client";

import { useParams } from "next/navigation";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image"; // Import the Next.js Image component
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import ProjectDescription from "../components/ProjectDescription";
import { NextPage } from "next";
import { useGetProjectByIdQuery } from "@/redux/api/projectService";
import LoadingSpinner from "@/components/ui/LoadingSpinner ";
import ImageSlider from "@/components/ui/ImageSlider";

interface Technology {
  name: string;
  image: string;
  publicId: string;
}

export interface MediaItem {
  url: string;
  type: "image" | "video";
}

interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: Technology[];
  media: MediaItem[];
  liveUrl: string;
  githubUrl: string;
  createdAt: string;
  featured: boolean;
  category: { name: string };
}

const TechnologyList: React.FC<{ technologies: Technology[] }> = ({
  technologies,
}) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {technologies.map((tech) => (
      <div
        key={tech.publicId}
        className="bg-gray-200 rounded-full px-3 py-1 text-gray-700 text-sm flex items-center"
      >
        <Image
          src={tech.image}
          alt={tech.name}
          width={16} // Set the width (4 * 4)
          height={16} // Set the height (4 * 4)
          className="inline-block mr-2"
          priority
        />
        {tech.name}
      </div>
    ))}
  </div>
);

const Page: NextPage = () => {
  const { id } = useParams(); // Use useParams to get the project ID

  const {
    data: project,
    isLoading,
    error,
  } = useGetProjectByIdQuery(id as string);

  useEffect(() => {
    if (project) {
      document.title = project.title || "Project Details";
    }
  }, [project]);
  const slidesCount = project?.media ? project.media.length : 0;
  const enableLoop = slidesCount > 1;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.toString()}</div>;
  }

  if (!project) {
    return <div className="text-gray-500">No project found</div>;
  }

  return (
    <div className="bg-transparent py-16 mt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-transparent rounded-lg shadow-lg overflow-hidden">
          {/* <MediaDisplay media={project.media} enableLoop={enableLoop} /> */}
          <ImageSlider media={project.media} />
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            <h1 className="text-3xl font-bold mb-4">Tecknology I Used </h1>
            <TechnologyList technologies={project.technologies} />
            {/* <div
              className="description mb-6 w-full  max-w-none p-0 m-0 prose  dark:prose-dark"
              dangerouslySetInnerHTML={{ __html: project.description }} // Render the HTML description
            />{" "} */}{" "}
            <ProjectDescription description={project.description} />
            <div className="flex justify-between">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center"
                >
                  <Github className="mr-2" />
                  GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <ExternalLink className="mr-2" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
