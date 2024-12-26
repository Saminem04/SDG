import { demoVolunteers } from './demoData';

// Initialize demo data
const initializeDemoData = () => {
  if (!localStorage.getItem('volunteerData')) {
    localStorage.setItem('volunteerData', JSON.stringify(demoVolunteers));
  }
};

export const getVolunteerData = (volunteerId) => {
  try {
    initializeDemoData();
    const volunteerData = JSON.parse(localStorage.getItem('volunteerData')) || [];
    return volunteerData.find(volunteer => volunteer.volunteer_id === volunteerId);
  } catch (error) {
    console.error('Error retrieving volunteer data:', error);
    return null;
  }
};

export const getAllProjects = () => {
  try {
    const ngoData = JSON.parse(localStorage.getItem('ngoData')) || [];
    return ngoData.flatMap(ngo => 
      (ngo.projects || []).map(project => ({
        ...project,
        ngo_name: ngo.name
      }))
    );
  } catch (error) {
    console.error('Error retrieving projects:', error);
    return [];
  }
};