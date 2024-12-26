import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tab } from '@headlessui/react';
import AvailableProjectCard from './AvailableProjectCard';
import { getAllProjects } from '../../utils/volunteerStorage';

export default function ProjectsList() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const projects = getAllProjects();

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'education', name: 'Education' },
    { id: 'health', name: 'Health' },
    { id: 'environment', name: 'Environment' },
    { id: 'poverty', name: 'Poverty' },
    { id: 'gender_equality', name: 'Gender Equality' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.project_type.toLowerCase() === selectedCategory);

  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-2 rounded-xl bg-white p-1 shadow-md mb-6">
          {categories.map((category) => (
            <Tab
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5
                ${selected
                  ? 'bg-gradient-to-r from-blue-500 to-green-400 text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <Tab.Panel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <AvailableProjectCard key={project.project_id} project={project} />
              ))}
            </motion.div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}