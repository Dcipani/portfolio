import React, { useState } from 'react';
import SectionHeader from "../SectionHeader";
import Rolodex from "../../images/rolodex.png"
import './style.scss';

const About = () => {  
    const [cardIndex, setCardIndex] = useState(0)
    const numCards = 4;
    const [lastId, setLastId] = useState(0)
    const cards = [
        {id: lastId, front: 'Languages', back: 'Card 4 back'},
        {id: 3, front: 'Experience', back: 'Card 3 back'},
        {id: 2, front: 'Education', back: 'Card 2 back'},
        {id: 1, front: 'Interests', back: 'Card 1 back'},
    ];     

    const handleClick = () => {
        setCardIndex(cardIndex+1);
        if (cardIndex >= cards.length-1) {
            setLastId(0)
            setCardIndex(0)
        } else if (cardIndex === 1) {
            setLastId(numCards)
        }
    };
    const setZIndex = (card, cardIndex) => {
        return (cardIndex >= card.id) ? card.id : 10-card.id;
    };
    return (
        <section className='about-section'>
            <SectionHeader title="about" />
            <div className="rolodex">
                <img className="rolodex-image" src={Rolodex} alt="rolo" />
                <div className="cards-container">
                    {cards.map((card, index) => (
                        <div 
                        key={card.id} 
                        className={`card ${(cardIndex >= card.id) ? 'top' : 'bottom'}`} 
                        style={{ zIndex: setZIndex(card, cardIndex) }} 
                        onClick={handleClick}
                        >
                            <div className="card-front">
                                {card.front}   
                            </div>
                            <div className="card-back">
                                {card.back}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )

};
    
export default About;
        
