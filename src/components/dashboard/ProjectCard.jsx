import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ProjectCard({ project }) {
  const calculateProgress = () => {
    if (!project.progress_parameters?.length) return 0;
    const completedParams = project.progress_updates?.length || 0;
    return Math.round((completedParams / project.progress_parameters.length) * 100);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            project.commitment_type === 'Remote' 
              ? 'bg-blue-100 text-blue-800'
              : project.commitment_type === 'Physical'
              ? 'bg-green-100 text-green-800'
              : 'bg-purple-100 text-purple-800'
          }`}>
            {project.commitment_type}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-500">
            <FaMapMarkerAlt className="mr-2" />
            <span>{`${project.city}, ${project.state}, ${project.country}`}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <FaUsers className="mr-2" />
            <span>{`${project.volunteer_accepted?.length || 0} volunteers`}</span>
          </div>
          
          <div className="flex items-center text-gray-500">
            <FaClock className="mr-2" />
            <span>{new Date(project.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{calculateProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 1 }}
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-400"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {project.required_skills?.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
            {project.required_skills?.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                +{project.required_skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500">Funding Required:</span>
            <span className="ml-1 font-medium">${project.funding_requirements}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg text-sm font-medium"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}