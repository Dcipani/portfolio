

import React, { useEffect, useRef, useState } from "react";
import SectionHeader from "../SectionHeader";
import './style.scss';

const About = () => {  
    const cards = [
        {title: 'interests', points: ['i', 'have', 'interests', ' i', 'promise', 'man']},
        {title: 'education', points: ['i', 'go', 'to', ' school', 'sometimes']},
        {title: 'experience', points: ['h', 'e', 'l', ' l', 'o']},
        {title: 'languages', points: ['english', 'italian', 'german', ' japanese', 'spanish', 'french']},
    ]

    const refs = useRef([]);
    
    useEffect(() => {
      refs.current.forEach((ref, index) => {
        if (ref) {
          console.log(`Ref for card ${index} set to:`, ref);
        }
      });
    }, []);

   
    const [lineCoordinates, setLineCoordinates] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  useEffect(() => {
    if (refs.current.length >= 2) {
      const ref1 = refs.current[0].getBoundingClientRect();
      const ref2 = refs.current[1].getBoundingClientRect();

      const x1 = ref1.x + ref1.width / 2;
      const y1 = ref1.y + 1000;
      const x2 = ref2.x + ref2.width / 2;
      const y2 = ref2.y + 1000;

      setLineCoordinates({ x1, y1, x2, y2 });
    }
  }, []);
  
    return (
        <section className='about-section'>
            <SectionHeader title="about" />
            <div className="corkboard">
                {cards.map((card, index) => (

                <div key={index} className="card-wrapper">
                    <div className="card">
                        <div className="card-hole" key={index} 
                              ref={(el) => (refs.current[index] = el)}
                        />
                        <div className="card-content">

                            <div className="card-title">{card.title}</div>
                            <ul className="card-points">
                                        {card.points.map((point, idx) => (
                                            <li key={idx}>{point}</li>
                                        ))}
                            </ul>         
                        </div>               
                    </div>
                    <div className="card-border"></div>
                </div>
                ))}
            </div>
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
            <line
              x1={lineCoordinates.x1}
              y1={lineCoordinates.y1}
              x2={lineCoordinates.x2}
              y2={lineCoordinates.y2}
              stroke="black"
              strokeWidth="2"
            />
        </svg>
            
        </section>
    )

};
    
export default About;
        
