import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectHighlights from './components/ProjectHighlights';
import ProjectsPage from './components/ProjectsPage';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import NGODashboard from './components/dashboard/NGODashboard';
import VolunteerDashboard from './components/volunteer/VolunteerDashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProjectHighlights />
              <Testimonials />
            </>
          } />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}