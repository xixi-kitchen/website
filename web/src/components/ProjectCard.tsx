// src/components/ProjectCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

interface ProjectProps {
  title: string;
  subtitle: string;
  duration: string;
  role: string;
  description: string;
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  subtitle,
  duration,
  role,
  description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 
                 hover:scale-105 transition-transform flex flex-col"
      whileHover={{ scale: 1.05 }}
    >
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>
      <p className="mt-2 text-sm text-gray-400">{duration}</p>
      <p className="mt-1 text-sm text-gray-500">角色：{role}</p>
      <p className="mt-4 text-gray-700 dark:text-gray-300">
        {isExpanded ? description : `${description.substring(0, 100)}...`}
        <button
          className="text-primary font-bold ml-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "收起" : "展开"}
        </button>
      </p>
    </motion.div>
  );
};

export default ProjectCard;