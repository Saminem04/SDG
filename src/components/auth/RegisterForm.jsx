import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    sector: [],
    unique_id: '',
    verification_documents: {},
    un_ecosoc: 'NO'
  });

  const navigate = useNavigate();

  const sectors = ['Health', 'Education', 'Environment', 'Poverty', 'Gender Equality'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ngoData = {
      ...formData,
      ngo_id: Date.now(),
      login_id: `${formData.name.toLowerCase().replace(/\s+/g, '_')}@sdgplatform.com`,
      verification_status: 'Pending',
      operational_status: 'Active',
      projects_posted: 0,
      number_volunteers_taken: 0,
      review: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // In a real app, implement proper data storage
    console.log('NGO Registration Data:', ngoData);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg"
      >
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            NGO Registration
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">NGO Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unique ID</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.unique_id}
                onChange={(e) => setFormData({ ...formData, unique_id: e.target.value })}
              />
            </div>

            {/* Location Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {/* Sectors */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sectors</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {sectors.map((sector) => (
                  <label key={sector} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      checked={formData.sector.includes(sector)}
                      onChange={(e) => {
                        const updatedSectors = e.target.checked
                          ? [...formData.sector, sector]
                          : formData.sector.filter((s) => s !== sector);
                        setFormData({ ...formData, sector: updatedSectors });
                      }}
                    />
                    <span className="ml-2">{sector}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* UN ECOSOC Status */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">UN ECOSOC Status</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.un_ecosoc}
                onChange={(e) => setFormData({ ...formData, un_ecosoc: e.target.value })}
              >
                <option value="NO">No</option>
                <option value="YES">Yes</option>
              </select>
            </div>

            {/* Document Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Verification Documents</label>
              <input
                type="file"
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const documents = {};
                  files.forEach((file) => {
                    documents[file.name] = URL.createObjectURL(file);
                  });
                  setFormData({ ...formData, verification_documents: documents });
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register NGO
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}