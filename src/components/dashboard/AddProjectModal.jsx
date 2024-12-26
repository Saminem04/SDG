import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function AddProjectModal({ isOpen, onClose, ngoId }) {
  const [formData, setFormData] = useState({
    title: '',
    project_type: 'EDUCATION',
    description: '',
    required_skills: [],
    commitment_type: 'Remote',
    country: '',
    state: '',
    city: '',
    safe_for_women: false,
    progress_parameters: [],
    funding_requirements: 0
  });

  const projectTypes = ['EDUCATION', 'HEALTH', 'ENVIRONMENT', 'POVERTY', 'GENDER_EQUALITY'];
  const commitmentTypes = ['Remote', 'Physical', 'Both'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      ...formData,
      project_id: Date.now(),
      ngo_id: ngoId,
      progress_updates: [],
      volunteer_accepted: [],
      volunteers_requests: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Add project to storage
    const ngoData = JSON.parse(localStorage.getItem('ngoData'));
    const updatedNGOs = ngoData.map(ngo => {
      if (ngo.ngo_id === ngoId) {
        return {
          ...ngo,
          projects: [...(ngo.projects || []), newProject]
        };
      }
      return ngo;
    });
    localStorage.setItem('ngoData', JSON.stringify(updatedNGOs));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Add New Project</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Project Type
                  </label>
                  <select
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  >
                    {projectTypes.map(type => (
                      <option key={type} value={type}>{type.replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Required Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.required_skills.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      required_skills: e.target.value.split(',').map(skill => skill.trim())
                    })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Commitment Type
                  </label>
                  <select
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.commitment_type}
                    onChange={(e) => setFormData({ ...formData, commitment_type: e.target.value })}
                  >
                    {commitmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Funding Requirements ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.funding_requirements}
                    onChange={(e) => setFormData({
                      ...formData,
                      funding_requirements: parseFloat(e.target.value)
                    })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Progress Parameters (comma-separated)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    value={formData.progress_parameters.join(', ')}
                    onChange={(e) => setFormData({
                      ...formData,
                      progress_parameters: e.target.value.split(',').map(param => param.trim())
                    })}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={formData.safe_for_women}
                      onChange={(e) => setFormData({
                        ...formData,
                        safe_for_women: e.target.checked
                      })}
                    />
                    <span className="text-sm font-medium text-gray-700">Safe for Women</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg hover:from-blue-600 hover:to-green-500"
                >
                  Create Project
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}