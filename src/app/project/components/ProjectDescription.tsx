import React, { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import { decodeHtml, detectLanguage } from "@/utils/detectLanguage";

interface ProjectDescriptionProps {
  description: string;
}

const ProjectDescription: React.FC<ProjectDescriptionProps> = ({
  description,
}) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [description]);

  const processDescription = (desc: string): string => {
    const decodedDescription = decodeHtml(desc); // Decode HTML entities

    const processedDescription = decodedDescription.replace(
      /<pre class="ql-syntax" spellcheck="false">([\s\S]*?)<\/pre>/g,
      (match, code) => {
        const trimmedCode = code.trim(); // Trim whitespace
        const language = detectLanguage(trimmedCode);
        return `<pre class="ql-syntax language-${language}" spellcheck="false"><code>${trimmedCode}</code></pre>`;
      }
    );

    // Convert back HTML entities to ensure safe rendering
    return processedDescription.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  };

  return (
    <div
      className="description mb-6 w-full max-w-none p-0 m-0 prose dark:prose-dark"
      dangerouslySetInnerHTML={{ __html: processDescription(description) }}
    />
  );
};

export default ProjectDescription;
