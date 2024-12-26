// Re-export getAllProjects from volunteerStorage to maintain compatibility
export { getAllProjects } from './volunteerStorage';

// Add any project-specific storage functions here
export const getProjectById = (projectId) => {
  try {
    const ngoData = JSON.parse(localStorage.getItem('ngoData')) || [];
    for (const ngo of ngoData) {
      const project = (ngo.projects || []).find(p => p.project_id === projectId);
      if (project) return { ...project, ngo_name: ngo.name };
    }
    return null;
  } catch (error) {
    console.error('Error retrieving project:', error);
    return null;
  }
};