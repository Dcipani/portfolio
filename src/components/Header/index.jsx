import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./style.scss";

import GithubLogo from "../../images/github.png";
import LinkedinLogo from "../../images/linkedin.png";

export default function Header() {
  const cliffWrapperRef = useRef(null);
  const blockRef = useRef(null);

  const beetBodyRef = useRef(null);

  const sproutIdleRef = useRef(null);
  const sproutFloatRef = useRef(null);
  const sproutFloatRef2 = useRef(null);
  const featuresIdleRef = useRef(null);
  const featuresChargeRef = useRef(null);
  const featuresJumpRef = useRef(null);
  const beetRef = useRef(null);
  const landingBarRef = useRef(null);
useLayoutEffect(() => {
  const tl = gsap.timeline();

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

  const swapLayer = (fromRef, toRef, at = ">") => {
    tl.set(fromRef.current, { opacity: 0 }, at);
    tl.set(toRef.current, { opacity: 1 }, at);
  };

  // PREP
  const bodyPaths = prepSVG(beetBodyRef);
  const sproutIdlePaths = prepSVG(sproutIdleRef);
  const featureIdlePaths = prepSVG(featuresIdleRef);

  prepSVG(sproutFloatRef, true);
  prepSVG(sproutFloatRef2, true);
  prepSVG(featuresChargeRef, true);
  prepSVG(featuresJumpRef, true);

  gsap.set(
    [
      sproutFloatRef.current,
      sproutFloatRef2.current,
      featuresChargeRef.current,
      featuresJumpRef.current
    ],
    { opacity: 0 }
  );

  // FLOAT SPRITE LOOP
  const sproutFlutter = gsap.timeline({
    repeat: -1,
    paused: true
  });

  sproutFlutter
    .to(sproutFloatRef.current, {
      opacity: 0,
      duration: 0.14
    })
    .to(
      sproutFloatRef2.current,
      {
        opacity: 1,
        duration: 0.14
      },
      "<"
    )
    .to(sproutFloatRef2.current, {
      opacity: 0,
      duration: 0.14
    })
    .to(
      sproutFloatRef.current,
      {
        opacity: 1,
        duration: 0.14
      },
      "<"
    );

  // CLIFF ENTER
  tl.fromTo(
    cliffWrapperRef.current,
    { x: 500, rotate: 6 },
    {
      x: 0,
      rotate: 0,
      duration: 1.2,
      ease: "power3.out"
    }
  );

  // DRAW BODY
  tl.set(bodyPaths, { visibility: "visible" });
  tl.to(bodyPaths, {
    strokeDashoffset: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "power2.out"
  });

  // DRAW SPROUT
  tl.set(sproutIdlePaths, { visibility: "visible" });
  tl.to(sproutIdlePaths, {
    strokeDashoffset: 0,
    duration: 0.3,
    stagger: 0.02,
    ease: "power2.out"
  });

  // DRAW FEATURES
  tl.set(featureIdlePaths, { visibility: "visible" });
  tl.to(featureIdlePaths, {
    strokeDashoffset: 0,
    duration: 1.25,
    stagger: 0.06,
    ease: "power2.out"
  });

  // CHARGE FACE
  swapLayer(featuresIdleRef, featuresChargeRef);

  tl.to(beetRef.current, {
    y: 8,
    scaleY: 0.9,
    scaleX: 1.08,
    duration: 0.2,
    ease: "power2.inOut"
  });

  // BAR ENTERS
  tl.to(
    landingBarRef.current,
    {
      x: 900,
      y: -160,
      duration: 0.75,
      ease: "power3.out"
    },
    "<"
  );

  // BEGIN JUMP (pure vertical first)
tl.to(
  beetRef.current,
  {
    y: -40,
    scaleY: 1.08,
    scaleX: 0.92,
    duration: 0.5,
    ease: "power2.out",
    onStart: () => {
      gsap.set(featuresChargeRef.current, { opacity: 0 });
      gsap.set(featuresJumpRef.current, { opacity: 1 });

      gsap.set(sproutIdleRef.current, { opacity: 0 });
      gsap.set(sproutFloatRef.current, { opacity: 1 });

      sproutFlutter.play();
    }
  }
);

// HORIZONTAL GLIDE starts AFTER jump peak
tl.to(
  beetRef.current,
  {
    x: "-35vw",
    duration: 3.2,
    ease: "none"
  },
  "<+=0.08"
);

// FALL starts immediately with glide
tl.to(
  beetRef.current,
  {
    y: "38vh",
    rotate: -12,
    scaleY: 1,
    scaleX: 1,
    duration: 2.7,
    ease: "power1.in"
  },
  "<"
);


  // LANDING: stop flutter + restore sprout
  tl.call(() => {
    sproutFlutter.pause();

    gsap.set(sproutFloatRef.current, { opacity: 0 });
    gsap.set(sproutFloatRef2.current, { opacity: 0 });
    gsap.set(sproutIdleRef.current, { opacity: 1 });
  });

  // LANDING BOUNCE
  tl.to(beetRef.current, {
    y: "+=18",
    duration: 0.15,
    ease: "power2.in"
  });

  // JUMP FACE → CHARGE
  swapLayer(featuresJumpRef, featuresChargeRef, "<");

  tl.to(beetRef.current, {
    y: "-=10",
    duration: 0.14,
    ease: "power2.out"
  });

  // CHARGE → IDLE
  tl.to(beetRef.current, {
    y: "+=8",
    duration: 0.12,
    ease: "power2.inOut"
  });

  swapLayer(featuresChargeRef, featuresIdleRef, ">");
}, []);
  return (
    <section className="header-section">
      <div className="col-table">
        <div className="col-1">
          <h1 id="header-text">Hi, I'm Dario.</h1>

          <p id="header-text">
            I study Linguistics and Computer Science at Trinity College Dublin.
          </p>

          <div className="logo-container">
            <a
              href="https://www.github.com/dcipani"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={GithubLogo} alt="github" className="logo" />
            </a>

            <a
              href="https://www.linkedin.com/in/dario-cipani-b82bb3269"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={LinkedinLogo} alt="linkedin" className="logo" />
            </a>
          </div>
          <div ref={landingBarRef} className="landing-bar" />

        </div>

        <div className="col-2">
          <div className="frog-scene">
            <div ref={cliffWrapperRef} className="cliff-wrapper">
              <div ref={blockRef} className="saul-block"></div>

              <div ref={beetRef} className="beet-creature">

                {/* BODY */}
                  <svg ref={beetBodyRef} className="beet-layer beet-body" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">
                  <g transform="translate(80 -35)">
                    <path fill="none" stroke="#5b4e7a" strokeWidth="5.76" strokeLinecap="square" strokeLinejoin="bevel" d="M173.63 131.708c-16.295-16.295-52.44 39.236-55.896 49.607-5.766 17.295-11.498 50.76-6.289 67.427 2.18 6.979 12.246 6.291 17.817 6.987 3.308.414 12.347 11.149 16.07 13.276 16.098 9.199 45.26 9.252 62.535 3.493 53.022-17.674 42.7-117.192-30.394-118.78-10.839-.236-26.597-2.778-35.634 4.89-25.912 21.987-24.866 120.535 24.455 96.423 38.188-18.67 18.243-102.13-16.42-76.51-23.434 17.321-12.172 56.43 18.166 55.898 14.98-.263 27.604-11.993 32.49-25.504 1.838-5.08-2.962-17.967 2.097-16.07 14.316 5.369 33.663 45.637 23.407 59.74-12.045 16.561-67.219 10.795-65.68-15.372 3.11-52.864 77.91-25.06 51.007-2.794-45.092 37.317-71.944-45.731-29.696-64.631 39.889-17.845 48.44 94.925-19.214 70.57-42.037-15.133-23.082-102.604 29.695-75.461 27.105 13.94.652 45.927-7.686 38.08-15.846-14.915-23.633-72.802 2.795-60.789 42.104 19.138-4.37 71.84-43.67 67.077-65.547-7.945 25.42-81.489-6.288-70.92-15.276 5.092-29.66 28.246-25.154 44.02 1.833 6.413.254 23.216 5.59 19.214 3.424-2.568 6.81-9.109 9.782-12.577 15.68-18.293-13.26-12.623-16.42-3.144-13.255 39.766.487 77.854 41.224 88.038 5.303 1.326 15.632 8.414 20.962 6.638 4.44-1.481 16.87-18.931 12.227-23.058-25.715-22.858-13.703 39.727 0 7.337 2.301-5.439 3.332-11.657 4.193-17.468.253-1.714-.069-10.771 2.794-11.18 38.5-5.5 18.86 40.873-3.144 33.539-3.04-1.014-3.239-6.383-5.24-8.385-1.52-1.519.733-5.647 1.747-7.336 5.448-9.081 40.088 31.531 36.682-5.939-.308-3.388-12.165-19.69-13.625-16.77-7.83 15.662 10.141 16.413 19.564 9.084 7.977-6.205 2.917-41.866-10.83-38.43-12.487 3.122-2.422 28.298 8.734 28.298 18.099 0 9.152-43.53-1.048-38.429-11.22 5.61 13.275 34.47 13.275 5.24 0-4.09-.733-8.367-2.096-12.227-1.836-5.203-6.174-8.624-8.035-13.276-2.073-5.182-1.588-20.21-9.083-22.708-31.306-10.435-2.931 42.367 6.638 38.779 18.987-7.12-22.647-59.928-42.273-37.032-17.217 20.088 30.655 23.362 15.723 5.939-3.211-3.746-4.789-4.67-9.084-7.337-2.834-1.758-18.616-11.578-22.359-9.083-11.4 7.6-32.206 45.092-8.734 50.308 19.602 4.355 21.68-40.526.7-40.526-17.602 0-20.386 50.969-18.517 62.186 1.632 9.791 28.036 31.442-14.323 31.442-21.951 0-10.778-34.26 3.493-27.6 23.405 10.923-15.486 51.357 19.214 51.357.827 0 2.873-6.095 3.144-6.638 9.376-18.751-6.891-40.62 11.18-58.692"/><path fill="none" stroke="#5b4e7a" strokeWidth="5.76" strokeLinecap="square" strokeLinejoin="bevel" d="M167.692 128.563c57.354 0 116.105 98.99 57.294 124.72-34.84 15.243-64.402-61.809-23.057-56.945 18.721 2.203-13.892 83.936-53.801 61.487-25.805-14.515 18.954-60.61 32.84-32.84 29.202 58.405-77.186 30.209-19.565 1.398 1.282-.641 9.512 33.607-8.734 35.634-19.16 2.129-33.177-33.039-26.9-47.163.276-.62 1.048-2.426 1.048-1.747 0 8.674-21.266 22.328-12.577 33.189 17.38 21.726 50.275-59.077 30.394-67.775-27.924-12.217-9.375 58.746 18.865 42.272 11.729-6.841 5.852-32.183 2.096-41.573-.966-2.416-12.332-14.498-12.227-13.974.93 4.65 8.075 11.883 11.529 14.673 24.74 19.982 25.776-43.366 10.48-42.274-13.12.937-28.288 79.67 16.42 57.994 4.374-2.121 8.002-4.908 10.132-9.433 8.388-17.826-20.448-57.411-26.9 4.541-.745 7.143-1.676 15.803 6.288 18.866 32.661 12.562 27.586-42.79 12.576-35.285-18.208 9.104 4.193 39.836 4.193 42.97 0 4.295-40.12 37.07-18.866 43.321 12.263 3.606 17.437-13.745 6.988 4.542-5.664 9.91-20.208 16.02-30.394 7.685-14.57-11.92 14.3-37.18 26.9-32.14 3.558 1.423-10.64 35.094-24.455 28.647-16.502-7.701 9.159-49.18.35-64.282-11.888-20.378-55.91 12.219-25.504 34.237 32.933 23.848 57.324-39.17 34.936-60.439-17.464-16.59-33.99 10.11-37.381 24.805-1.225 5.308 6.657 7.97 10.48 9.782 2.033.962 8.538 2.445 6.289 2.445-9.08 0-18.772-.35-27.6-.35-3.143 0 0-6.288 0-9.432 0-14.253 4.965-56.666 25.504-60.09 15.101-2.514 30.766 30.917 15.021 33.542-5.09.848-64.588-25.303-7.686-36.683 1.753-.35 9.233-1.947 10.83-.35.84.84-2.308.63-3.493.699-15.2.894-61.234 20.63-37.032 42.97 59.501 54.924 82.488-58.578 37.731-54.848-32.64 2.72-13.802 77.715 8.036 53.451 12.357-13.73-7.721-39.668-22.36-26.201-14.797 13.614-19.811 76.324 2.447 61.484.549-.365 1.19-.772 1.398-1.397 1.117-3.353-5.794-3.666-6.987-3.843-14.761-2.187-24.717 4.344-22.01 19.914.572 3.29 3.238 7.756 5.94 9.782 14.936 11.202 42.68-13.042 32.839-29.696-12.66-21.42-36.089 11.714-26.553 18.866 19.111 14.334 39.958-46.662 64.63-44.018 23.744 2.543 14.301 45.826-.349 54.15-9.075 5.156-20.83 4.398-30.394 1.397-44.434-13.94 15.76-79.083 47.513-54.5 32.992 25.543-28.99 72.629-46.465 40.177-10.71-19.89 25.07-57.392 46.115-50.657 39.235 12.555-25.36 93.263-51.006 73.015-9.034-7.132-13.497-18.84-13.974-30.044-1.925-45.25 93.378-51.144 65.33 2.795-4.099 7.882-11.263 16.435-19.913 19.564-33.8 12.225-71.658-39.277-43.32-64.631 37.903-33.914 60.527 25.616 37.38 38.08-30.961 16.67-61.887-56.371-11.877-50.309 6.872.833 12.54 5.38 16.07 11.18 17.663 29.016-55.48 48.542-25.153 67.076 4.468 2.73 10.01 3.127 15.022 3.843 17.593 2.513 16.59-34.413 4.542-38.43-.204-.067-5.092-1.142-5.24-.698-7.082 21.244 11.01 62.905 38.429 43.32 16.125-11.518-6.07-42.202-17.119-48.91-19.257-11.692-52.466 67.585-39.128 70.92 22.826 5.706 9.419-21.312 33.539-19.215 3.98.346 8.746-.111 11.18 3.843 9.627 15.645-25.586 15.642-21.661-4.542 1.756-9.029 56.875-79.13 37.381-95.374-14.112-11.76-17.399 26.947-8.734 25.503 11.138-1.856 12.017-38.726-7.336-33.888-6.97 1.743-10.45 37.73-9.083 37.73 3.03 0 .486-6.056.349-9.082-.312-6.858.19-28.221-10.132-29.696-.576-.082-2.158.412-1.746 0 1.49-1.49 30.278-7.545 16.07-16.07-15.06-9.036-28.861-.91-5.939 7.686 16.143 6.053-18.116-22.759-35.984-4.891-10.719 10.72 11.391 17.899 16.77 17.469 18.225-1.459 4.12-19.505-8.734-18.516-31.056 2.389-85.494 97.836-37.382 105.855"/><path fill="none" stroke="#5b4e7a" strokeWidth="5.76" strokeLinecap="square" strokeLinejoin="bevel" d="M154.156 185.265c-20.49 10.245-46.318 36.914-33.897 61.755 2.422 4.844 15.008 4.73 17.18-.232 10.303-23.551-11.482-11.88 5.107 6.036 2.922 3.156 6.962 4.215 11.144 3.25 23.998-5.538 30.804-59.935 18.805-58.04-18.329 2.894-3.767 43.856 22.521 43.181 13.308-.341 10.07-10.776 5.34-18.109-1.444-2.237-2.91-8.522-4.644-6.5-6.877 8.023-3.848 28.713 9.983 25.073 7.915-2.082 2.395-16.518 1.858-21.359-.436-3.922 3.946-11.84 0-11.84-13.263 0-.428 40.36-.465 40.396-7.292 7.292-37.242 9.687-48.29 13.001-2.243.673-6.964-1.413-6.964.929 0 26.276 71.904-13.675 78.702-19.502 9.369-8.03 3.775-11.057 14.627-16.483 3.873-1.937-14.504-4.085 4.643-8.59 2.291-.54-8.604-2.958-6.268-3.25 6.435-.805 3.672-.435.696-1.625-1.317-.527-3.02-.233-4.411-.233-30.223 0-11.784 1.978-24.377 27.163"/><path fill="none" stroke="#5b4e7a" strokeWidth="5.76" strokeLinecap="square" strokeLinejoin="bevel" d="M184.568 267.218c0 6.287 18.297-7.926 19.734-11.376 7.37-17.69 31.842-65.367 37.146-60.594 17.549 15.794-43.602 82.762-77.774 38.075-12.71-16.62 12.209-82.683 26.234-78.007 18.266 6.09-.798 44.309-8.59 38.075-.825-.66-.633-2.324-.697-3.018-.99-10.896 25.599-21.677 19.734-24.61-5.545-2.772-11.66.569-16.251 3.483-14.33 9.094-45.35 31.863-50.147 49.45-.44 1.611.63 6.468-2.09 5.108-15.617-7.809 17.105-77.774 39.468-77.774"/><path fill="none" stroke="#5b4e7a" strokeWidth="3.6" strokeLinecap="square" strokeLinejoin="bevel" d="M132.332 145.1c-12.07 8.047-16.085 36.308 4.643 33.2 14.668-2.202 24.891-53.085 37.146-39.469 6.04 6.712 8.48 19.546 3.714 27.627-4.74 8.038-14.215 8.714-19.501 15.555-18.794 24.321 3.801 50.628 30.18 51.075 27.26.462 13.796-100.074 33.896-68.487 13.461 21.152 4.18 61.015-11.84 78.006-9.236 9.795-23.721 7.396-35.288 12.537-1.828.812-11.785 8.269-6.965 10.679 60.199 30.1 28.996-102.847-17.18-102.847"/><path fill="none" stroke="#5b4e7a" strokeWidth="3.6" strokeLinecap="square" strokeLinejoin="bevel" d="M134.952 143.659c30.309 0 38.31-14.28 68.07 9.102 6.597 5.183 15.194 8.843 18.6 17.017 12.775 30.66-32.692 6.124-23.35-6.332 9.463-12.617 23.214 16.953 18.205 18.205-.416.104-13.555-27.576-27.703-33.64-8.533-3.656-17.82-5.016-26.515-7.914-1.807-.603-11.615-.607-11.477-.792 15.808-21.077 38.896 9.022 48.282 22.162"/><path fill="none" stroke="#5b4e7a" strokeWidth="3.6" strokeLinecap="square" strokeLinejoin="bevel" d="M132.973 258.032c28.651 0 46.994 2.369 69.653-15.435 2.701-2.122 35.073-30.499 36.409-28.494 21.541 32.312-75.189 38.172-60.154 49.865 32.665 25.407 66.456-79.837 47.094-104.479-20.35-25.9-15.858 23.23-3.562 32.452.72.54 1.872 1.69 2.771.791 6.756-6.756-15.124-28.783-20.58-32.056-.861-.517-2.77-2.192-2.77-1.187 0 10.787 22.757 23.944 20.975 22.162-6.477-6.477-63.106-46.55-71.235-22.162-.772 2.314 8.76-.864 9.893-1.187 7.92-2.263 19.074-9.57 27.307-3.166.457.355 7.203 9.102 4.75 9.102-18.385 0-24.938-27.438-59.364-19.788-3.48.774-18.403 11.674-13.851 16.227 1.061 1.062 21.227-13.186 24.14-14.643 7.154-3.577 31.68-6.981 22.56-13.061-2.53-1.686-7.961 1.28-9.102 3.562-15.295 30.588-32.634 103.303-32.057 103.688.03.02 34.5-39.166 36.409-42.346 1.312-2.187.236-1.027 1.187-1.979"/>
                  </g>
                </svg>
                
                {/* SPROUT */}
                
               <svg ref={sproutIdleRef} className="beet-layer  active-layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">
                  <path fill="none" stroke="#395537" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M253.346 99.558c0-10.105 14.365-30.758 24.282-30.758"/>
                  <path fill="none" stroke="#395537" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M277.628 68.8c-2.577-7.73-58.704-21.023-42.494-37.233 33.116-33.116 53.99 80.833 81.75 62.326 16.606-11.07-20.656-42.074-35.614-27.116-.982.982-5.03 2.023-3.642 2.023"/>
                  <path fill="none" stroke="#395537" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M278.033 64.754c-4.183 0-40.878-27.11-38.853-31.164 6.65-13.294 25.358 12.414 21.046 14.571-23.432 11.715-14.811-29.5-8.499-12.142.689 1.895 1.619 4.027 1.619 6.07 0 13.429-24.785-8.903-17.403-8.903 2.364 0 15.515 26.643 28.33 20.236 8.66-4.33-11.983-34.154-19.426-26.711-4.719 4.719 24.549 25.22 26.71 29.543 4.376 8.75 26.048 25.968 34.805 29.949 1.128.512 4.974 2.929 6.475 2.428 3.939-1.313-1.277-11.076-3.237-12.546-10.888-8.166-7.006 6.615 1.619 10.927 1.466.733 3.279 1.454 2.833 3.238-2.084 8.334-19.75-7.69.404-7.69 4.937 0-13.482-20.513-19.02-14.974C283.8 79.222 329 85.394 317.693 85.394"/>
                  <path fill="none" stroke="#395537" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M291.387 72.442c-1.241 0-1.953-.67-2.428-1.619-5.63-11.259 7.908 5.184 10.118 8.499 6.213 9.32 10.59-4.699 4.047-6.88-13.514-4.505-1.119 12.038 6.475 14.57"/>
                  <path fill="none" stroke="#395537" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M319.718 90.654c-3.369-3.368-31.454-4.16-20.64-14.974m-48.566-27.52c-12.906 0-3.544-11.332 5.668-11.332"/>
                </svg>
                <svg ref={sproutFloatRef} className="beet-layer  hidden-layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">

                  <path fill="none" stroke="#395537" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M253.214 101.092c0-11.277-1.196-29.163 7.429-37.788m-8.721-3.876c-22.25 0-48.765-41.018-3.552-41.018m10.658 2.906c34.68 0 98.558 97.564 11.95 54.26"/>
                  <path fill="none" stroke="#395537" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M257.736 51.03c8.485 0 32.71 8.676 13.888 18.087m26.161-8.72c4.764 0 6.137 12.58 6.137 16.149M290.68 58.782c.485.728 9.632 17.764 6.137 17.764m-59.908-39.05c0-17.924 35.282-3.918 41.473 2.273"/>
                  <path fill="none" stroke="#395537" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M244.862 42.61c0-8.072 14.791-1.704 17.612-1.704m19.102 32.075c2.06-2.06 4.495-9.486 2.237-11.744"/>
                </svg>
                <svg ref={sproutFloatRef2} className="beet-layer  hidden-layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">
                  <path fill="none" stroke="#395537" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M263.349 65.838c-16.758 0-34.689-63.137 8.46-41.562 9.418 4.709 17.913 10.236 25.746 17.286 12.109 10.898 26.85 27.926 26.85 45.24m-44.872-3.678c2.938 0 36.78 26.873 36.78 11.77"/>
                  <path fill="none" stroke="#395537" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M299.762 77.607c0 1.055 1.854 11.402-.736 11.402m8.828-18.022c0 5.603 5.403 13.723.368 18.758m-42.298-34.573c0-10.27 22.436 6.778 22.436 15.447m-32-26.85c0-6.913 18.023-7.314 18.023-1.84m-23.171-9.562c0-4.635 9.563-5.605 9.563-3.31m-9.563 70.986c0-12.127 12.213-31.631 26.114-31.631"/>
                </svg>
                  

                {/* FEATURES */}
                
                <svg ref={featuresIdleRef} className="beet-layer  active-layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M198.267 140.559c-4.764 0-13.254 6.729-6.465 11.254 1.825 1.217 2.822 1.437 5.028 1.437 6.572 0 5.6-16.855-1.676-9.578-15.664 15.664 20.614 0-.24 0-3.05 0-3.102 5.403-1.915 7.184 3.554 5.33 11.015 3.58 11.015-3.592 0-1.492-.119-2.393-.718-3.592-2.796-5.592-8.142-1.839-8.142 4.07 0 .58 1.019 1.498 1.437 1.916m68.683-2.862c-10.33 0 .81 21.615 9.247 8.958 10.992-16.489-23.431-4.046-5.49-4.046 1.047 0-.006-4.85-3.18-2.311-9.511 7.61 11.82 6.054 3.757 2.023-6.314-3.158 1.734 15.126 1.734.866"/>
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M265.274 146.797c-3.414 0 9.824-.524 9.824 2.89"/>
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M265.274 146.796c-3.053 1.527 12.239 5.304 9.825 2.89"/>
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M263.251 148.531c0-9.422 9.758-.29 10.114-.29"/>
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M266.719 144.485c4.303 0 12.815 5.201 8.38 5.201"/>
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="M268.164 141.884c-7.965 0-9.327 11.559-5.78 11.559m5.78-11.559c8.099 0 7.224 6.36 7.224 12.137m-52.794 25.022c4.25 0 9.164-.416 13.197-1.76m-10.111 62.758c0 14.071.626 12.896-14.655 12.896m64.774-12.309c0 16.489-1.826 14.655-18.172 14.655"/>
                </svg>

                <svg ref={featuresChargeRef} className="beet-layer  hidden-layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">
                  <path fill="none" stroke="#000" strokeWidth="5.04" strokeLinecap="square" strokeLinejoin="bevel" d="m225.518 237.54-11.294 6.922 6.922 10.201m53.92-16.393-12.023 5.1 6.922 12.023m-76.508-113.306 13.844 5.1-11.294 6.559m78.695-8.38-13.48 4.372 15.302 7.286m-57.2 21.86 5.83-4.006 7.286 4.736 6.558-5.466 6.558 4.008"/>
                </svg>

                <svg ref={featuresJumpRef} className="beet-layer  hidden-layer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 368.64 368.64">
                  <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M221.935 236.862c-7.59 0-8.075 10.493-8.075 15.905m55.546-13.947c-8.4 0-10.646 18.841-8.32 18.841m-41.108-79.281c6.164 0 12.077-1.468 18.107-1.468m-9.298 1.713c0 8.752 8.32 10.682 8.32.245m-38.417-39.151c-14.367 0-8.175 19.503 3.426 13.703 5.32-2.66 2.113-15.713-5.384-13.214-7.94 2.648-4.62 11.746 2.692 11.746 4.555 0 3.779-10.522 1.223-10.522-8.195 0-7.34 9.665-1.223 6.607 1.14-.57-2.447-4.21-2.447-2.937"/>
                  <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M198.2 143.39c7.738 0 .734 5.274.734 4.404m66.557-6.363c-3.047 0-5.347 3.126-6.853 5.384-5.444 8.168 13.296 19.984 16.886 5.628 2.36-9.447-12.208-16.75-15.172-4.894-1.347 5.39 1.664 10.766 7.83 10.766 3.706 0 3.623-.833 6.362-2.202 2.258-1.13 2.936-4.35 2.936-6.851 0-5.212-4.97-9.75-10.277-7.097-3.23 1.615-4.404 6.29-4.404 9.544 0 2.937 5.329 4.534 7.585 3.18 9.797-5.878-7.988-18.145-6.362-5.137.41 3.27 4.428 5.934 6.607 2.447 10.577-16.924-14.417 6.352-.245-.734 2.586-1.293-2.442-6.135-3.425-2.202-2.298 9.19 10.537-2.692 2.447-2.692"/>
                  <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M266.958 152.443c-2.12 0 .751-7.145 2.448-5.872"/>
                  <path fill="none" stroke="#000" stroke-width="3.6" stroke-linecap="square" stroke-linejoin="bevel" d="M269.651 149.262c0-.82-4.633-3.67-5.873-3.67m-71.206-3.182c-5.361 0-2.886 11.5 2.447 11.5"/>
                </svg>


              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

