import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./style.scss";

import CubeButton from "../CubeButton/index";

const tagColors = {
  "Game Dev": "#338a51ff",
  AI: "#C92124",
  Python: "#D96E25",
  Music: "#0F5D6D",
  Research: "#D89B2D",
  "Computer Vision": "#E34D2D",
  Syntax: "#7A5A1B"
};

const ProjectDetail = ({ project, onClose }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useLayoutEffect(() => {
    if (!modalRef.current) return;

    gsap.fromTo(
      modalRef.current,
      {
        y: -120,
        scaleY: 0.82,
        scaleX: 1.12,
        rotate: -2,
        opacity: 0
      },
      {
        y: 0,
        scaleY: 1,
        scaleX: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.32,
        ease: "power2.out"
      }
    );
  }, []);

  if (!project) {
    return null;
  }

  return (
    <div className="project-modal">
      <div className="modal-overlay" onClick={onClose}></div>

      <div ref={modalRef} className="modal-content">
  <div className="modal-topbar">
    <h1>{project.title}</h1>

    <CubeButton className="close-button" onClick={onClose} size={40}>
      X
    </CubeButton>
  </div>

  <div className="modal-body">
    <div className="project-tags">
      {project.tags.map((tag, index) => (
        <span
          key={index}
          className="project-tag"
          style={{ backgroundColor: tagColors[tag] || "#757575" }}
        >
          {tag}
        </span>
      ))}
    </div>

    <div className="project-image-wrapper">
      <img
        className="project-image"
        src={project.imageSrc}
        alt={project.title}
      />
    </div>

    <p>{project.description}</p>
  </div>
</div>
    </div>
  );
};

export default ProjectDetail;