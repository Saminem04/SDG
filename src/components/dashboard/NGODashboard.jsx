import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaProjectDiagram, FaUsers, FaChartLine } from 'react-icons/fa';
import AddProjectModal from './AddProjectModal';
import ProjectCard from './ProjectCard';
import { getNGOData } from '../../utils/storage';

export default function NGODashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const ngoData = getNGOData(localStorage.getItem('currentNGO'));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-green-400 rounded-xl p-8 text-white mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome, {ngoData?.name}</h1>
          <p className="opacity-90">Manage your projects and volunteer applications</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4"
            >
              <div className="flex items-center">
                <FaProjectDiagram className="text-2xl mr-3" />
                <div>
                  <p className="text-sm opacity-90">Active Projects</p>
                  <p className="text-2xl font-bold">{ngoData?.projects?.length || 0}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4"
            >
              <div className="flex items-center">
                <FaUsers className="text-2xl mr-3" />
                <div>
                  <p className="text-sm opacity-90">Total Volunteers</p>
                  <p className="text-2xl font-bold">{ngoData?.number_volunteers_taken || 0}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4"
            >
              <div className="flex items-center">
                <FaChartLine className="text-2xl mr-3" />
                <div>
                  <p className="text-sm opacity-90">Average Progress</p>
                  <p className="text-2xl font-bold">
                    {ngoData?.projects?.reduce((acc, proj) => acc + (proj.progress || 0), 0) / 
                      (ngoData?.projects?.length || 1)}%
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAddModalOpen(true)}
          className="mb-8 bg-gradient-to-r from-blue-500 to-green-400 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
        >
          <FaPlus className="mr-2" />
          Add New Project
        </motion.button>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {ngoData?.projects?.map((project) => (
            <motion.div key={project.project_id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        ngoId={ngoData?.ngo_id}
      />
    </div>
  );
}