import React from 'react';
import StarryBackground from './components/StarryBackground';
import BookLayout from './components/BookLayout';
import CoverPage from './pages/CoverPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
    const pages = [
        <CoverPage />,
        <AboutPage />,
        <SkillsPage />,
        <ProjectsPage />,
        <ContactPage />,
    ];

    return (
        <div className="App">
            <StarryBackground />
            <BookLayout pages={pages} />
        </div>
    );
}

export default App;
