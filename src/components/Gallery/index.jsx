import React, { useState } from 'react';
import "./style.scss";
import SectionHeader from "../SectionHeader";
import Project from "../Project";

const Gallery = ({ projects, setSelectedProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const projectsPerPage = 3; 

  const visibleProjects = projects.slice(currentIndex, currentIndex + projectsPerPage);

  const handleNextClick = () => {
    if (isAnimating) return; 

    setIsAnimating(true); 

    setTimeout(() => {
      if (currentIndex + projectsPerPage >= projects.length) {
        setCurrentIndex(0);
      } else if (currentIndex + 2 * projectsPerPage >= projects.length) {
        setCurrentIndex(currentIndex + projectsPerPage - (currentIndex + 2 * projectsPerPage - projects.length));
      } else {
        setCurrentIndex(currentIndex + projectsPerPage);
      }

    }, 300); 
    setTimeout(() => {
      setIsAnimating(false); 
    }, 800); 

  };

  return (
    <section className="gallery">
      <SectionHeader title="projects" />
      <div className={`gallery-container ${isAnimating ? 'animating' : ''}`}>
        {visibleProjects.map((project, index) => (
          <Project
            key={index}
            title={project.title}
            imageSrc={project.imageSrc}
            tags={project.tags}
            onClick={() => setSelectedProject(index)}
          />
        ))}
      </div>
      <button className="next-arrow" onClick={handleNextClick}>
        &#9654; 
      </button>
    </section>
  );
};

export default Gallery;
