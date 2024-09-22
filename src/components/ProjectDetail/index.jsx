import React from 'react';
import './style.scss';

const tagColors = {
  'Game Dev': '#4CAF50', // Green
  'AI': '#9C27B0',      // Purple
  'Python': '#FF5722',  // Orange
  'Music': '#61DAFB',   // Light Blue
  // Add more tags and colors as needed
};

const ProjectDetail = ({ project, onBack }) => {
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-detail">
      <button onClick={onBack}>Back to Gallery</button>
      <div className="project-header">
        <h1>{project.title}</h1>
        <div>
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="project-tag"
              style={{ backgroundColor: tagColors[tag] || '#757575' }} // Default color
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <img src={project.imageSrc} alt={project.title} style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }} />
      <p>{project.description}</p>
    </div>
  );
};

export default ProjectDetail;
