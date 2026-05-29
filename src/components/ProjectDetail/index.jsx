import React from 'react';
import './style.scss';

import CubeButton from "../CubeButton/index";

const tagColors = {
  'Game Dev': '#4CAF50', // Green
  'AI': '#9C27B0',      // Purple
  'Python': '#FF5722',  // Orange
  'Music': '#61DAFB',   // Light Blue
  'Research': '#49EF22',   // Light Blue
  'Computer Vision': '#642AE1',   // Light Blue
  'Syntax': '#F1E235',   // Light Blue
};



const ProjectDetail = ({ project, onClose }) => {
  if (!project) {
    return null;
  }

  return (
    <div className="project-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <CubeButton className="close-button" onClick={onClose} size={40}>X</CubeButton>
        <div className="project-header">
          <h1>{project.title}</h1>
          <div>
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="project-tag"
                style={{ backgroundColor: tagColors[tag] || '#757575' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="project-image-wrapper">
          <img className="project-image" src={project.imageSrc} alt={project.title}  />
        </div>
        <p>{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectDetail;
