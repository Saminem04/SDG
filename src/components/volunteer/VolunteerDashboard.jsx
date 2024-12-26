import React from 'react';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaBuilding, FaStar } from 'react-icons/fa';
import ProjectsList from './ProjectsList';
import { getVolunteerData } from '../../utils/volunteerStorage';

export default function VolunteerDashboard() {
  const volunteerData = getVolunteerData(localStorage.getItem('currentVolunteer'));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-green-400 rounded-xl p-8 text-white mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome, {volunteerData?.name}</h1>
          <p className="opacity-90">Explore and join meaningful projects worldwide</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4"
            >
              <div className="flex items-center">
                <FaHandsHelping className="text-2xl mr-3" />
                <div>
                  <p className="text-sm opacity-90">Projects Joined</p>
                  <p className="text-2xl font-bold">{volunteerData?.projects_joined?.length || 0}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4"
            >
              <div className="flex items-center">
                <FaBuilding className="text-2xl mr-3" />
                <div>
                  <p className="text-sm opacity-90">NGOs Worked With</p>
                  <p className="text-2xl font-bold">
                    {new Set(volunteerData?.projects_joined?.map(p => p.ngo_id)).size || 0}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/20 backdrop-blur-lg rounded-lg p-4"
            >
              <div className="flex items-center">
                <FaStar className="text-2xl mr-3" />
                <div>
                  <p className="text-sm opacity-90">Impact Score</p>
                  <p className="text-2xl font-bold">{volunteerData?.impact_score || 0}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <ProjectsList />
      </div>
    </div>
  );
}