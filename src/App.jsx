import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import About from './components/About';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Gallery from './components/Gallery';
import ProjectDetail from './components/ProjectDetail';

import './App.scss';
import AIChef from './images/AI-Chef.png';
import Gino from './images/Gino.png';
import Shazlamb from './images/Shazlamb.png';

const projectData = [
  {
    title: "Gino's Pasta",
    imageSrc: Gino,
    tags: ['Game Dev'],
    description: 'This project involves building an image classifier using a convolutional neural network to categorize images into different classes.'
  },
  {
    title: 'AI Chef',
    imageSrc: AIChef,
    tags: ['Game Dev', 'AI'],
    description: 'A React-based frontend dashboard with various widgets and charts.'
  },
  {
    title: 'Shazlamb! Rise of the AI DJ',
    imageSrc: Shazlamb,
    tags: ['Game Dev', 'Music'],
    description: 'A React-based frontend dashboard with various widgets and charts.'
  }
];

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Refs for the sections
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const sections = [
      { ref: homeRef, id: 'home' },
      { ref: aboutRef, id: 'about' },
      { ref: portfolioRef, id: 'projects' }
    ];

    sections.forEach(({ ref, id }) => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 15%',
        end: '40% 15%',
        onEnter: () => {
          setActiveSection(id);
          window.history.replaceState(null, null, `#${id}`); // Update URL on enter
        },
        onEnterBack: () => {
          setActiveSection(id);
          window.history.replaceState(null, null, `#${id}`); // Update URL on scroll back
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      {selectedProject === null ? (
        <>
          <Navbar activeSection={activeSection} />
          <div ref={homeRef} id="home">
            <Header />
          </div>
          <div ref={aboutRef} id="about">
            <About />
          </div>
          <div ref={portfolioRef} id="projects">
            <Gallery projects={projectData} setSelectedProject={setSelectedProject} />
          </div>
        </>
      ) : (
        <>
          <Navbar activeSection={activeSection} />
          <div ref={homeRef} id="home">
            <Header />
          </div>
          <div ref={aboutRef} id="about">
            <About />
          </div>
          <div ref={portfolioRef} id="projects">
            <ProjectDetail project={projectData[selectedProject]} onBack={() => setSelectedProject(null)} />
          </div>
        </>
      )}
      <svg width="0" height="0">
        <filter id="wavy">
          <feTurbulence x="0" y="0" baseFrequency=".25" numOctaves="5" seed="2"   />
          <feDisplacementMap in='SourceGraphic' scale="2.5"></feDisplacementMap>
        </filter>
        <filter id="turbulence" >
            <feTurbulence x="0" y="0" type="fractalNoise" baseFrequency=".75"   />
        </filter>
      </svg>
      <div className="noise"></div>
    </div>
  );
};

export default App;