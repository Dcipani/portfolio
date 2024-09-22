import React from 'react';
import './style.scss';

const tagColors = {
  'Game Dev': '#4CAF50', // Green
  'AI': '#9C27B0',      // Purple
  'Python': '#FF5722',  // Orange
  'Music': '#61DAFB',   // Light Blue
};

const Project = ({ title, imageSrc, tags, onClick }) => {
  return (
    <div className="project" onClick={onClick}>
      <img className="project-image" src={imageSrc} alt={title} />
      <div className="project-overlay">
        <h3 className="project-title">{title}</h3>
        <div className="project-tags">
          {tags.map((tag, index) => (
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
    </div>
  );
};

export default Project;
