import React, { useState, useEffect, useRef } from 'react';
import "./style.scss";
import SectionHeader from "../SectionHeader";
import Project from "../Project";

const Gallery = ({ projects, setSelectedProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrowDirection, setArrowDirection] = useState('right');

  const projectsPerPage = 3;

  const projectsLoop = [...projects, ...projects.slice(0, projectsPerPage)];

  const galleryRef = useRef(null);

  const handleNextClick = () => {
    if (currentIndex + projectsPerPage >= projects.length) {
      setCurrentIndex(0);
      setArrowDirection('right');
    } else if (currentIndex + 2*projectsPerPage >= projects.length) {
      setCurrentIndex((prevIndex) => prevIndex + projectsPerPage);
      setArrowDirection('left'); // Change arrow direction to left
    } else {
      setCurrentIndex((prevIndex) => prevIndex + projectsPerPage);
    }
  };



  useEffect(() => {
    const galleryElement = galleryRef.current;

    if (currentIndex === projects.length) {
      setTimeout(() => {
        galleryElement.style.transition = 'none'; 
        setCurrentIndex(0); 
        galleryElement.style.transform = `translateX(0)`; 
      }, 500); 
    } else {
      galleryElement.style.transition = 'transform 0.5s ease-in-out'; 
    }
  }, [currentIndex, projects.length]);

  const containerWidth = projectsLoop.length * 100 / projectsPerPage + "%";

  return (
    <section className="gallery">
      <SectionHeader title="projects" />
      <div className="gallery-viewport">
        <div
          ref={galleryRef}
          className="gallery-container"
          style={{ transform: `translateX(-${(currentIndex / projectsLoop.length) * 100}%)`, width: containerWidth }}
        >
          {projectsLoop.map((project, index) => (
            <Project
              key={index}
              title={project.title}
              imageSrc={project.imageSrc}
              tags={project.tags}
              onClick={() => setSelectedProject(index % projects.length)}
            />
          ))}
        </div>
      </div>
      <button   className={`next-arrow ${arrowDirection}`} onClick={handleNextClick}>
        &#9664;
      </button>
    </section>
  );
};

export default Gallery;
