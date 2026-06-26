import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import "./style.scss";
import SectionHeader from "../SectionHeader";
import Project from "../Project";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = ({ projects, setSelectedProject }) => {
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const wugRef = useRef(null);
  const wugBodyRef = useRef(null);

  const wugContactRef = useRef(null);
  const wugDownRef = useRef(null);
  const wugPassingRef = useRef(null);
  const wugUpRef = useRef(null);

  useLayoutEffect(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wugRef.current,
      start: "top 85%",
      once: true
    }
  });

  const prepSVG = (svgRef, alreadyDrawn = false) => {
    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path) => {
      const length = path.getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: alreadyDrawn ? 0 : length,
        visibility: alreadyDrawn ? "visible" : "hidden"
      });
    });

    return paths;
  };

  // prep body + first visible frame
  const bodyPaths = prepSVG(wugBodyRef);
  const contactPaths = prepSVG(wugContactRef);

  // prep other frames (fully drawn but hidden)
  prepSVG(wugDownRef, true);
  prepSVG(wugPassingRef, true);
  prepSVG(wugUpRef, true);

  const featureRefs = [
    wugContactRef.current,
    wugDownRef.current,
    wugPassingRef.current,
    wugUpRef.current
  ];

  // hide all alternate frames initially
  gsap.set(featureRefs.slice(1), { opacity: 0 });

  // draw body
  tl.set(bodyPaths, { visibility: "visible" });
  tl.to(bodyPaths, {
    strokeDashoffset: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power2.out"
  });

  // draw first contact frame
  tl.set(contactPaths, { visibility: "visible" });
  tl.to(contactPaths, {
    strokeDashoffset: 0,
    duration: 2.5,
    stagger: .5,
    ease: "power2.out"
  });

  
  // start walk cycle
  tl.call(() => {
    let frame = 0;

    const walkCycle = setInterval(() => {
      featureRefs.forEach((ref) => {
        gsap.set(ref, { opacity: 0 });
      });

      gsap.set(featureRefs[frame], { opacity: 1 });

      frame = (frame + 1) % featureRefs.length;
    }, 140);

    // cleanup
    wugRef.current.walkCycle = walkCycle;
  });

  return () => {
    if (wugRef.current?.walkCycle) {
      clearInterval(wugRef.current.walkCycle);
    }
  };
}, []);

  // responsive project count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 700) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1100) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // clone front + back for seamless looping
  const clonedProjects = [
    ...projects.slice(-visibleCount),
    ...projects,
    ...projects.slice(0, visibleCount)
  ];

  const projectWidth = 100 / visibleCount;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleTransitionEnd = () => {
      setIsTransitioning(false);

      // jumped past end → snap back
      if (currentIndex >= projects.length + visibleCount) {
        gallery.style.transition = "none";
        setCurrentIndex(visibleCount);
      }

      // jumped past start → snap forward
      if (currentIndex < visibleCount) {
        gallery.style.transition = "none";
        setCurrentIndex(projects.length + visibleCount - 1);
      }
    };

    gallery.addEventListener("transitionend", handleTransitionEnd);

    return () =>
      gallery.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex, projects.length, visibleCount]);

  // restore transition after snapping
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    requestAnimationFrame(() => {
      gallery.style.transition = "transform 0.5s ease-in-out";
    });
  }, [currentIndex]);

  // start at real first item
  useEffect(() => {
    setCurrentIndex(visibleCount);
  }, [visibleCount]);

  const handleNextClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + visibleCount);
  };

  const handlePrevClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - visibleCount);
  };

  return (
    <section className="gallery">
      <SectionHeader title="projects" />
      <div ref={wugRef} className="wug-creature">
        {/* BODY */}
        <svg
          ref={wugBodyRef}
          className="wug-layer"
          viewBox="0 0 368.64 368.64"
        >
          <path fill="none" stroke="#89bcf6" stroke-width="12.146" stroke-linecap="square" stroke-linejoin="bevel" d="M230.744 93.135c-40.702 0-145.212 16.85-99.937 84.763 15.758 23.636 87.216 25.66 81.1-12.557-4.976-31.107-50.542-40.717-53.368-2.093-2.668 36.457 22.469 27.932 46.044 34.533 1.92.538 15.533 7.512 12.034 11.511-16.872 19.282-79.473 4.829-74.822-38.196 1.04-9.61 5.85-22.113 14.65-27.208 35.668-20.65 50.303 45.954 10.465 47.614-7.671.32-12.815-2.864-15.174-10.465-7.191-23.175 16.962-69.682 46.569-53.892 18.138 9.674 1.984 65.6-4.71 45.52-11.483-34.452 49.646-25.3 57.033-3.139 16.041 48.123-11.555 67.94-55.986 75.345-6.837 1.14-20.586 2.4-25.638-3.662-12.14-14.568 15.968-45.858 22.499-37.15 11.848 15.798-29.828 41.583-35.58 21.453"/>
          <path fill="none" stroke="#89bcf6" stroke-width="12.146" stroke-linecap="square" stroke-linejoin="bevel" d="M87.38 252.196c29.982 0 149.304 3.45 156.969-27.207 4.904-19.62-14.229-33.883-31.917-37.673-38.425-8.234-28.574 48.8 2.093 23.545 27.699-22.811-39.597-66.218-68.02-55.985-18.476 6.651-21.844 66.385.523 70.113 20.057 3.342-2.133-29.689-13.604-28.255-9.107 1.138-.481 44.885-29.824 50.753-.781.156-5.65 2.2-6.279 1.57-1.306-1.307.899-6.207 1.57-7.325 12.038-20.064 28.492-39.372 36.626-61.742"/>
          <path fill="none" stroke="#89bcf6" stroke-width="12.146" stroke-linecap="square" stroke-linejoin="bevel" d="M106.215 229.698c0-19.545 4.101-95.144 15.697-106.74 15.906-15.905 35.298-17.909 52.846-26.683 7.215-3.607 21.896-2.73 28.777 1.57 8.038 5.023 23.772 55.533 19.883 63.31-3.257 6.515-12.724 11.422-19.36 13.081-11.43 2.858-21.518-1.38-29.3-9.941-24.143-26.559 16.01-35.059 20.406-27.732 2.631 4.385 2.378 9.802 1.57 14.65-3.02 18.114-67.51 62.09-62.788 31.394.286-1.86.2-4.049 2.093-5.232 31.119-19.45 49.194 80.057-8.895 60.694-5.064-1.688 3.572-8.407 4.71-8.895 25.1-10.757 39.67 23.518 68.542 6.802 10.818-6.262 19.717-46.726.523-38.195-17.126 7.611 33.313 57.37 35.057 1.569.194-6.201 1.759-16.411-.523-22.498-9.379-25.01-34.808 26.804-16.221 25.114 23.356-2.123 9.794-46.19 1.047-54.938-2.103-2.103-6.59-5.294-9.418-6.803-3.238-1.727-6.836-2.337-10.465-2.616-26.71-2.054 6.697 29.72 10.465 24.069 11.221-16.832-21.173-54.416-39.242-54.416-4.866 0-9.964 7.537-12.035 10.988-23.31 38.85 11.33 25.958 7.325 9.941-6.032-24.13-51.53 13.7-55.462 31.394-3.61 16.249 36.29 26.61 36.626 26.161 16.348-21.796-28.254-70.72-28.254-20.929 0 7.333-.38 18.98 5.232 24.592"/>
          <path fill="none" stroke="#89bcf6" stroke-width="12.146" stroke-linecap="square" stroke-linejoin="bevel" d="M230.744 93.135c-44.77 0 22.267 66.331 17.79 84.24-10.967 43.867-72.207 76.465-113.54 52.846-35.592-20.338 3.766-79.508 15.696-100.983.3-.54 2.497-3.58 2.093-4.186-3.011-4.517-8.372-7.449-8.372-13.604 0-7.782 1.178-8.437 7.326-11.511 42.892-21.446 50.885 50.917 14.65 41.858-.512-.128 17.236-50.176 36.626-42.904 14.786 5.544 5.103 31.783 0 40.288-.3.5-3.122 5.24-4.186 4.71-22.226-11.114 15.698-57.321 15.698-21.454 0 52.567-70.475 41.356-85.81 64.357-41.762 62.644 43.435 38.725 9.942 5.232-1.27-1.27-2.24 2.953-2.616 4.709-3.933 18.351 1.515 38.521-20.406 42.905-.688.138-5.437 1.365-6.279.523-11.047-11.047.293-56.372 21.453-52.846 17.294 2.883-10.904 63.552 15.173 57.032 42.846-10.711 2.487-83.318 58.079-78.484 38.974 3.389 4.391 68.262-13.604 62.264-36.237-12.079 22.035-70.316 45.521-73.252 5.364-.67 13.393-1.711 15.696 3.663 7.845 18.305-23.832 5.956-18.313 18.836 6.033 14.077 32.049 16.036 18.837 34.533-2.603 3.644-9.592 8.372-14.128 8.372"/>
          <path fill="none" stroke="#89bcf6" stroke-width="12.146" stroke-linecap="square" stroke-linejoin="bevel" d="M118.773 249.057c0-23.37 28.996-112.312 57.032-88.948 19.872 16.56 14.897 81.018 42.905 71.682 18.036-6.012 4.167-36.008 6.802-49.184 2.827-14.136 24.553-30.482 21.975-4.709-.629 6.297-5.783 15.45-11.511 18.313-43.047 21.524-43.554-66.23-86.333-59.648-4.865.749-13.99 2.957-17.266 7.325-11.202 14.936 21.185 15.418 39.765-2.616 9.619-9.335 18.966-20.523 26.162-31.917.422-.669 6.91-14.542 7.325-14.127 5.51 5.51-11.04 50.782-29.824 43.951-21.219-7.716-10.539-38.793 7.325-20.929"/>
          <path fill="none" stroke="#89bcf6" stroke-width="12.146" stroke-linecap="square" stroke-linejoin="bevel" d="M113.995 245.494c0-23.657-4.647-79.727 13.016-97.39 19.584-19.583 13.197 43.25.897 9.425-5.223-14.363 28.725-28.137 28.725-43.982 0-2.412.897-7.181.897-7.181s-6.395 12.597-8.527 19.298c-7.722 24.27 18.605 32.274 28.274 51.613.096.19-6.064 51.198-7.18 57.895-1.34 8.041-47.293 17.783-52.061 13.015-1.424-1.424 19.895-9.325 21.542-9.874 11.463-3.821 22.67-9.403 33.211-15.259 17.346-9.636 30.954-25.782 52.959-23.338 6.065.674 16.352 6.07 22.44 4.04 4.734-1.578 4.929-28.054 6.283-27.377 9.741 4.87-5.055 25.739-7.63 29.172"/>
          <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M242.025 87.958c-52.68 0-101.4-8.97-131.657 41.458-19.957 33.262 18.925 124.934-48.181 124.934"/>
          <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M62.187 254.35c51.435 0 187.769 30.287 201.688-53.223 9.331-55.991-61.446-76.934-41.458-96.922 5.469-5.47 16.737-12.815 22.409-18.488"/>
        </svg>


        {/* CONTACT */}
        <svg
          ref={wugContactRef}
          className="wug-layer"
          viewBox="0 0 368.64 368.64"
        >
          <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M172.555 238.103c0 10.299 1.609 21.925-1.12 31.934-1.213 4.446-2.998 8.235-5.043 12.325-1.573 3.147-3.564 6.671-5.602 9.524-14.761 20.666 13.139-5.349 25.77 7.283m33.055-45.939c0 4.931 8.237 12.946 10.084 18.488 4.23 12.69-7.494 19.381 7.284 15.687 7.74-1.935 16.327-3.922 24.65-3.922M184.32 134.458c-4.918 0-7.301 1.626-5.602 6.723 2.53 7.59 19.037 5.031 11.205-2.8-11.21-11.21-20.312 2.94-7.284 7.282 4.226 1.409 7.844.54 7.844-3.361 0-10.078-13.042-1.12-2.241-1.12"/>
        </svg>

        {/* DOWN */}
        <svg
          ref={wugDownRef}
          className="wug-layer"
          viewBox="0 0 368.64 368.64"
        >
          <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M218.635 252.76c2.944 0 7.52 11.348 7.52 13.882 0 30.73-25.559 30.076 15.616 30.076m-69.986-62.466c0 16.273-.351 43.053-19.666 46.272-2.479.413-7.519.578-7.519.578s6.94 13.506 6.94 20.823"/>
        <path fill="none" stroke="#000" stroke-width=".72" stroke-linecap="square" stroke-linejoin="bevel" d="M182.786 131.693c-8.185 0-11.356 10.81-2.963 14.626 22.54 10.246 13.441-20.698-.774-15.012-4.04 1.616-5.86 5.036-4.832 9.149 1.33 5.322 7.115 8 12.177 8.633 18.565 2.32.842-29.191-11.275-14.045-1.915 2.393.027 7.565 1.998 9.535"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M183.431 132.273c-10.59 0-7.258 10.96 1.222 13.08 10.274 2.566 4.634-12.888-2.125-12.888"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M179.564 136.526c-6.046 0 1.138 9.278 6.314 9.278 11.642 0 2.198-9.729-4.832-9.729"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M178.663 137.622c-2.177 0 5.986 15.212 12.757 5.54 3.44-4.915-12.5-10.257-12.5-4.832"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M180.338 137.04c0-1.506-2.333 1.8-2.45 2.32-2.723 12.254 16.988.553 6.185-1.353-.616-.109.9 3.742 1.289 2.77"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M187.103 142.775c-2.187 0-4.14-.287-6.056-1.417-1.395-.823-2.183-1.757-2.642-3.287-.118-.391-.068-.423.322-.579 2.39-.956 4.52-.866 6.185 1.289.628.812 2.005 1.43 1.869 2.448-.517 3.88-10.68-3.677-5.348-3.48 11.957.445-2.254 11.021-2.254 2.451"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M178.663 137.621c-1.317-1.975 2.33 5.348 4.703 5.348"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M183.366 142.969c2.848 2.215-13.617-9.288-1.87-7.152 6.175 1.123 6.476 11.432-3.157 5.927"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M178.34 141.744c-2.626 0-1.983-4.961.065-4.961m6.829-2.834c0-2.767 13.517 23.361-2.706 10.18"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M188.585 147.091c6.539 0 2.571-13.401-4.961-13.401"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M187.234 146.894c4.524 0 6.856-3.574.69-4.602"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M188.586 147.093c4.847-.37 4.105-3.862-.84-5.44"/>
      </svg>

        {/* PASSING */}
        <svg
          ref={wugPassingRef}
          className="wug-layer"
          viewBox="0 0 368.64 368.64"
        >
          <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M185.608 259.615c0 42.912-20.12 31.083 19.242 31.083"/>
        <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M183.536 234.453c12.808 25.615 26.775 31.53 2.073 54.173-1.113 1.02-9.473 6.712-9.473 8.289 0 .33 17.439 5.301 19.538 7.4"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M185.512 131.58c-5.349 0-9.365.973-10.358 6.934-.935 5.61 7.276 9.246 11.728 9.246 19.082 0-2.654-14.354-2.654-15.41"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M182.773 134.405c-4.68 0-5.978 2.57-3.767 6.677 5.941 11.033 12.428-11.526 2.312-7.19-5.589 2.394 6.974 9.02 4.023 5.478-6.718-8.062 3.551 1.41 6.849 4.709.183.183.606.765.257 1.027-2.22 1.664-8.246-1.791-4.537-4.11 1.53-.956 2.225-.57 2.225 1.114"/>
        <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M181.917 140.397c0 3.124 3.078 5.393 5.993 5.393"/>
      </svg>

        {/* UP */}
        <svg
          ref={wugUpRef}
          className="wug-layer"
          viewBox="0 0 368.64 368.64"
        >
          <path fill="none" stroke="#000" stroke-width="7.2" stroke-linecap="square" stroke-linejoin="bevel" d="M176.12 260.797c0 20.288-20.217 27.127-3.006 30.815 4.08.874 9.981 2.716 13.027 5.762m-1.097-65.01c12.39 0 25.033 21.265 28.957 31.076 1.694 4.233 2.375 8.562 2.825 13.066.2 1.995-1.064 7.42.354 6.003 4.169-4.169 14.22-5.297 20.128-5.297"/>
          <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M181.31 133.254c-2.522 0-3.785 1.696-4.393 4.126-2.38 9.522 24.642 14.09 11.848-.532-3.21-3.67-8.302-6.975-11.449-1.73-1.996 3.327-2.16 8.81 2.53 9.984 1.084.27 2.172.676 3.195.931 2.441.61 13.12 1.457 9.85-3.993-.64-1.067-1.297-2.124-2.262-2.929-.625-.52-1.33-.823-1.864-1.464-2.673-3.207-3.547-6.85-7.722-5.458-6.837 2.279 3.22 13.084 4.394 8.385 1.142-4.568-5.75-10.194-4.393-3.86.28 1.306 6.184 11.17 8.253 7.72 3.778-6.296-9.18-10.072-4.792-5.058 10.035 11.47 1.73-8.207 1.73-.932 0 2.531 1.393 5.99 4.394 5.99"/>
        </svg> 
      </div>
          
     



   

      


      <div className="gallery-wrapper">
        <button className="gallery-arrow left" onClick={handlePrevClick}>
          &#9664;
        </button>

        <div className="gallery-viewport">
          <div
            ref={galleryRef}
            className="gallery-container"
            style={{
              transform: `translateX(-${currentIndex * projectWidth}%)`
            }}
          >
            {clonedProjects.map((project, index) => (
              <div
                key={index}
                className="project-slot"
                style={{ flex: `0 0 ${projectWidth}%` }}
              >
                <Project
                  title={project.title}
                  imageSrc={project.imageSrc}
                  tags={project.tags}
                  onClick={() =>
                    setSelectedProject(
                      (index - visibleCount + projects.length) %
                        projects.length
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <button className="gallery-arrow right" onClick={handleNextClick}>
          &#9654;
        </button>
      </div>
    </section>
  );
};

export default Gallery;


