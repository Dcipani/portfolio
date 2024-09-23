import React, { useState, useEffect } from "react";
import "./style.scss";
import SectionHeader from "../SectionHeader";

import CardImage from '../../images/pigs.png';


export default function About() {
    // Define the array of cards with color, title, bullets, and an image
    const cards = [
        {
            title: "Languages",
            bullets: [
                "English (Native)",
                "Italian (Native)",
                "German (Intermediate)",
                "Japanese (Intermediate)",
                "Spanish (Intermediate)",
                "French (Beginner)",
            ],
            image: CardImage
        },
        {
            title: "Card 2",
            bullets: [
                "Vitae voluptatibus nihil ex",
                "Recusandae quibusdam porro",
                "Labore delectus in hic facere"
            ],
            image: CardImage
        },
        {
            title: "Card 3",
            bullets: [
                "Dolorum repellendus minima",
                "Accusantium quod dolorum",
                "Voluptatum consequuntur inventore"
            ],
            image: CardImage
        }
    ];

    // State to keep track of the current card index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle left arrow click
    const prevCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
    };

    // Function to handle right arrow click
    const nextCard = () => {
        setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
    };

    // Event listener for arrow key controls
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                prevCard();
            } else if (event.key === "ArrowRight") {
                nextCard();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); // Empty array ensures this runs only on component mount/unmount

    return (
        <section className={"about-section"}>
            <SectionHeader title='about'/>
            <div className="carousel-container">
                <button onClick={prevCard} className="arrow left-arrow">←</button>

                <div className="card-image-container">
                    <div className="card-border">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="card" >
                            <h2>{cards[currentIndex].title}</h2>
                            <ul>
                                {cards[currentIndex].bullets.map((bullet, index) => (
                                    <li key={index}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="image-container">

                        <img 
                            src={cards[currentIndex].image} 
                            alt={cards[currentIndex].title} 
                            className="carousel-image" 
                        />
                    </div>
                </div>
                
                {/* Right arrow */}
                <button onClick={nextCard} className="arrow right-arrow">→</button>
            </div>
        </section>
    );
}
