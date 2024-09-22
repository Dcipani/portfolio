import React, { useState } from 'react';
import "./style.scss";
import SectionHeader from "../SectionHeader";
import ProjectDetail from '../ProjectDetail';
import Project from "../Project";



const Gallery = ({ projects , setSelectedProject}) => {

//temp stupid comment
  return (
    <section className="gallery">
      <SectionHeader title='projects'/>
        <div className="gallery-container">
          {projects.map((project, index) => (
            <Project
              key={index}
              title={project.title}

              imageSrc={`${project.imageSrc}`} // Access image in public/images
              tags={project.tags}
              onClick={() => setSelectedProject(index)} // Set the selected project index
            />
          ))}
        </div>
    </section>
  );
};

export default Gallery;
