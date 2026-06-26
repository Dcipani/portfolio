import React from 'react';
import './style.scss';

import CubeButton from "../CubeButton/index";

const tagColors = {
  'Game Dev': '#338a51ff',
  'AI': '#C92124',
  'Python': '#D96E25',
  'Music': '#0F5D6D',
  'Research': '#D89B2D',
  'Computer Vision': '#E34D2D',
  'Syntax': '#7A5A1B',
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
          <div className="project-tags">
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
