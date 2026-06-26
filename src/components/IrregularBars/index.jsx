import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import SectionHeader from "../SectionHeader";

import bikeBody from "../../images/bike/bike_body.png";
import bikeWheel from "../../images/bike/bike_wheel.png";

gsap.registerPlugin(ScrollTrigger);

const bars = [
  {
    label: 'ABOUT',
    detail: 'Who I am, what I build, and how I think...',
    color: '#151515',
    tilt: -1.5,
    offsetX: -20
  },
  {
    label: 'WORK',
    detail: 'Projects spanning AI, games, and computational art.',
    color: '#2f5ca4',
    tilt: 1.8,
    offsetX: 30
  },
  {
    label: 'CONTACT',
    detail: 'Reach out, collaborate, or just say hello.',
    color: '#3b357d',
    tilt: -1.2,
    offsetX: -10
  }
];
const BASE_FLEX = 1;
const EXPANDED_FLEX = 3;
const SHRUNK_FLEX = 0.5;

const IrregularBars = () => {
  const sectionRef = useRef(null);
  const headerRowRef = useRef(null);
  const barsRef = useRef([]);
  const bikeRef = useRef(null);
  const wheelRef = useRef(null);
  const bodyRef = useRef(null);

  const bikeTimelineRef = useRef(null);

  const [selected, setSelected] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const validBars = barsRef.current.filter(Boolean);

      // Bars scroll animation
      gsap.fromTo(
        validBars,
        {
          x: (i) => (i % 2 === 0 ? '-130%' : '130%'),
          rotate: (i) => bars[i].tilt + gsap.utils.random(-6, 6),
          y: () => gsap.utils.random(-30, 30),
        },
        {
          x: (i) => bars[i].offsetX,
          y: 0,
          rotate: (i) => bars[i].tilt,
          stagger: 0.15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 0%',
            scrub: 1.5
          }
        }
      );

      const buildBikeAnimation = () => {
        const topBar = barsRef.current[0];
        const headerRow = headerRowRef.current;

        if (!topBar || !headerRow) return;

        const header = headerRow.querySelector('.section-header');
        if (!header) return;

        const headerRect = header.getBoundingClientRect();
        const barRect = topBar.getBoundingClientRect();
        const bikeWidth = bikeRef.current.offsetWidth;

        const startX = headerRect.width + 40;
        const endX = barRect.width - bikeWidth - 20;

        gsap.set(bikeRef.current, { x: startX });

        if (bikeTimelineRef.current) {
          bikeTimelineRef.current.kill();
        }

        const distance = endX - startX;
        const SPEED = 140; // pixels per second
        const travelDuration = distance / SPEED;

        const tl = gsap.timeline({
          repeat: -1,
          yoyo: true
        });

        // bike movement
        tl.to(
          bikeRef.current,
          {
            x: endX,
            duration: 5,
            ease: 'none'
          },
          0
        );

        // wheel tied to movement
        tl.to(
          wheelRef.current,
          {
            rotate: distance * 2.5,
            duration: 5,
            ease: 'none',
            transformOrigin: 'center center'
          },
          0
        );

        // subtle jitter
        tl.to(
          bodyRef.current,
          {
            x: 2,
            duration: 0.28,
            repeat: Math.floor(travelDuration / 0.56),
            yoyo: true,
            ease: 'power1.inOut'
          },
          0
        );

        bikeTimelineRef.current = tl;
      };

      buildBikeAnimation();

      const handleResize = () => {
        buildBikeAnimation();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    barsRef.current.filter(Boolean).forEach((bar, i) => {
      let flex = BASE_FLEX;

      if (selected !== null) {
        flex = i === selected ? EXPANDED_FLEX : SHRUNK_FLEX;
      }

      gsap.to(bar, {
        flexGrow: flex,
        duration: 0.6,
        ease: 'power3.inOut'
      });
    });

    ScrollTrigger.refresh();
  }, [selected]);

  return (
    <section className="irregular-section" ref={sectionRef}>
      <div className="about-header-row" ref={headerRowRef}>
        <SectionHeader title="about" />

        <div className="bike-wrapper" ref={bikeRef}>
          <img
            ref={wheelRef}
            src={bikeWheel}
            className="bike-wheel"
            alt=""
          />
          <img
            ref={bodyRef}
            src={bikeBody}
            className="bike-body"
            alt=""
          />
        </div>
      </div>

      <div className="bars-container">
        {bars.map((bar, i) => (
          <div
            key={i}
            ref={(el) => (barsRef.current[i] = el)}
            className={`bass-bar ${selected === i ? 'selected' : ''}`}
            style={{
              backgroundColor: bar.color,
              transform: `rotate(${bar.tilt}deg) translateX(${bar.offsetX}px)`
            }}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="bar-content">
              <div className="bar-label">{bar.label}</div>

              {selected === i && (
                <div className="bar-detail">
                  {bar.detail}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IrregularBars;