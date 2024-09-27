

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

    
   
   
  
  
    return (
        <section className='about-section'>
            <SectionHeader title="about" />
            <div className="corkboard">
                {cards.map((card, index) => (

                <div key={index} className="card-wrapper">
                    <div className="card">
                        <div className="card-hole" key={index} 
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

            
        </section>
    )

};
    
export default About;
        
