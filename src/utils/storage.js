import { demoNGOs } from './demoData';

// Initialize demo data
const initializeDemoData = () => {
  if (!localStorage.getItem('ngoData')) {
    localStorage.setItem('ngoData', JSON.stringify(demoNGOs));
  }
};

export const saveNGOData = (ngoData) => {
  try {
    const existingData = JSON.parse(localStorage.getItem('ngoData')) || [];
    existingData.push(ngoData);
    localStorage.setItem('ngoData', JSON.stringify(existingData));
    return true;
  } catch (error) {
    console.error('Error saving NGO data:', error);
    return false;
  }
};

export const getNGOData = (loginId) => {
  try {
    initializeDemoData();
    const ngoData = JSON.parse(localStorage.getItem('ngoData')) || [];
    return ngoData.find(ngo => ngo.login_id === loginId);
  } catch (error) {
    console.error('Error retrieving NGO data:', error);
    return null;
  }
};

export const validateLogin = (loginId, password) => {
  try {
    initializeDemoData();
    const ngoData = JSON.parse(localStorage.getItem('ngoData')) || [];
    return ngoData.find(ngo => 
      ngo.login_id === loginId && ngo.password === password
    );
  } catch (error) {
    console.error('Error validating login:', error);
    return null;
  }
};