import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../SectionHeader";
import './style.scss';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const blobRefs = useRef([]);

  useEffect(() => {
    blobRefs.current.forEach((blob) => {
      gsap.fromTo(
        blob,
        { y: '60%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: blob,
            start: "-50% 100%",
            end: "-50 90%",
            scrub: true,
            toggleActions: "play none none none",
            markers: false
          }
        }
      );
    });
  }, []);

  const cards = [
    { title: 'programming experience', points: ['Python', 'Java', 'C#', 'Prolog', 'HTML/CSS/Javascript/React', 'R', 'ARM Assembly Language', 'ngn/k', 'GDScript', 'SQL and XML', ], fill: '#7a4452', path: "M38.7,-66.2C50.9,-60,62.1,-51.1,68.8,-39.7C75.6,-28.2,77.9,-14.1,78.6,0.4C79.3,14.9,78.4,29.8,72.7,43.1C67,56.4,56.5,68.1,43.6,76.7C30.7,85.3,15.3,90.9,0.4,90.2C-14.6,89.6,-29.3,82.8,-41.9,74C-54.5,65.3,-65.1,54.5,-73.4,41.8C-81.7,29.2,-87.6,14.6,-87,0.4C-86.4,-13.9,-79.2,-27.7,-71.5,-41.4C-63.8,-55.2,-55.7,-68.8,-43.7,-75.1C-31.7,-81.5,-15.9,-80.5,-1.3,-78.2C13.2,-75.9,26.5,-72.4,38.7,-66.2Z" },
    { title: 'interests', points: ['Teaching (Experience tutoring students privately through volunteer groups in Chess, Japanese and Coding/Logic, and in my role as TA)', 'Game Design and Development', 'Language Learning'], fill: '#9c6473', path: "M39.1,-70.3C50.3,-61.2,58.7,-50,65.4,-37.9C72.2,-25.9,77.1,-12.9,77.8,0.4C78.5,13.7,74.8,27.4,67.1,37.8C59.4,48.2,47.7,55.3,35.9,60.1C24,65,12,67.5,-1.8,70.7C-15.6,73.8,-31.3,77.6,-44.3,73.4C-57.3,69.2,-67.7,57.1,-76.2,43.6C-84.7,30.1,-91.3,15,-91.2,0C-91.1,-14.9,-84.4,-29.9,-76.4,-44.3C-68.4,-58.7,-59.1,-72.5,-46.2,-80.6C-33.3,-88.7,-16.6,-90.9,-1.3,-88.6C13.9,-86.3,27.9,-79.4,39.1,-70.3Z" },
    { title: 'languages', points: ['english (native)', 'italian (native)', 'german (intermediate)', 'japanese (intermediate)', 'spanish (beginner)', 'french (beginner)'], fill: '#4b232e', path: "M35.9,-65.3C46.8,-55.8,56.2,-46.8,65.3,-36C74.4,-25.2,83.2,-12.6,84.2,0.6C85.2,13.8,78.3,27.5,68.3,36.6C58.2,45.8,50.3,50.3,33,54.6C21.1,58.9,10.5,63.1,-2.8,68C-16.1,72.8,-32.3,78.3,-44.5,74.1C-56.6,70,-64.9,56.1,-68.5,42.1C-72.1,28.1,-71,14.1,-72.1,-0.6C-73.2,-15.3,-76.3,-30.6,-72.4,-44C-68.5,-57.4,-57.4,-68.8,-44.2,-77C-30.9,-85.1,-15.5,-89.9,-1.5,-87.3C12.5,-84.8,24.9,-74.8,35.9,-65.3Z" },
  ];

  return (
    <section className='about-section'>
      <SectionHeader title="about" />
      <div className="cork-board">
        {cards.map((card, index) => (
          <div
            className="blob-container"
            ref={el => blobRefs.current[index] = el}
            key={index}
          >
            <svg viewBox="0 0 185 185"> {/* Doubled height in viewBox */}
              <path fill={card.fill} d={card.path} transform="translate(100 100) scale(1, 1.5)" /> {/* Scale blob vertically */}
            </svg>
            <div className="blob-title">{card.title}</div>
            <ul className="blob-points">
              {card.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
