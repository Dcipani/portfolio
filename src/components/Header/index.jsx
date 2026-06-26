import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./style.scss";

import GithubLogo from '../../images/github.png';
import LinkedinLogo from '../../images/linkedin.png';
import Arm from '../../images/arm.png';

export default function Header() {
  const cliffWrapperRef = useRef(null);
  const blockRef = useRef(null);
  const boulderRef = useRef(null);
  const armRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    // cliff enters from right
    tl.fromTo(
      cliffWrapperRef.current,
      {
        x: 500,
        rotate: 6
      },
      {
        x: 0,
        rotate: 0,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // boulder drops onto cliff while cliff enters
    tl.fromTo(
      boulderRef.current,
      {
        y: -400,
        rotate: -30
      },
      {
        y: 0,
        rotate: -13,
        duration: 1.1,
        ease: "bounce.out"
      },
      "-=0.9"
    );

    // pause
    tl.to({}, { duration: 1.5 });

    // arm pokes in
    tl.fromTo(
      armRef.current,
      {
        x: 250,
        rotate: -6
      },
      {
        x: -220,
        rotate: 0,
        duration: 0.35,
        ease: "power2.out"
      }
    );

    // knock boulder off
    tl.to(
      boulderRef.current,
      {
        x: -120,
        y: 220,
        rotate: -120,
        duration: 0.75,
        ease: "power2.in"
      },
      "-=0.1"
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
            <div
              ref={cliffWrapperRef}
              className="cliff-wrapper"
            >
              <div
                ref={blockRef}
                className="saul-block"
              ></div>

              <div
                ref={boulderRef}
                className="boulder"
              ></div>

              <img
                ref={armRef}
                src={Arm}
                alt="arm"
                className="poke-arm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}