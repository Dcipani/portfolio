import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./style.scss";

import GithubLogo from '../../images/github.png';
import LinkedinLogo from '../../images/linkedin.png';
import Frogman from '../../images/frogman.png';

export default function Header() {
  const blockRef = useRef(null);
  const frogRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    // orange block slides in
    tl.fromTo(
      blockRef.current,
      {
        x: 400,
        rotate: 6,
      },
      {
        x: 0,
        rotate: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // frog drops directly onto top of block
    tl.fromTo(
      frogRef.current,
      {
        y: -600,
        rotate: -8
      },
      {
        y: 0,
        rotate: 0,
        duration: 1,
        ease: "bounce.out"
      },
      "-=0.15"
    );
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
        </div>

        <div className="col-2">
          <div className="frog-scene">
            <div ref={blockRef} className="saul-block"></div>

            <img
              ref={frogRef}
              src={Frogman}
              alt="frogman"
              className="frogman"
            />
          </div>
        </div>
      </div>
    </section>
  );
}