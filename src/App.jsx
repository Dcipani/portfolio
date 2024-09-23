import React, {useState} from 'react';

import About from './components/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';
import Cursor from './components/Cursor';
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




const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div>
      <svg width="0" height="0">
          <filter id="wavy">
            <feTurbulence x="0" y="0" baseFrequency=".25" numOctaves="5" seed="2"   />
            <feDisplacementMap in='SourceGraphic' scale="2.5"></feDisplacementMap>
          </filter>
        <filter id="turbulence" x="0" y="0">
            <feTurbulence type="fractalNoise" baseFrequency=".75"   />
        </filter>
      </svg>
      <div className="noise"></div>
      {selectedProject === null ? (
        <>
          <Navbar/> 
          <Header id='home'/> 
          <About id='about'/> 
          <Gallery projects={projectData} setSelectedProject={setSelectedProject} />
        </>
      ) : (
        <>
          <Navbar/> 
          <Header id='home'/> 
          <About id='about'/> 
          <ProjectDetail project={projectData[selectedProject]} onBack={() => setSelectedProject(null)} />
        </>
      )}
      
    </div>
  );
};

export default App;
