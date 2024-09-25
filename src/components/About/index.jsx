import React, { useState, useEffect } from "react";
import "./style.scss";
import SectionHeader from "../SectionHeader";

export default function About() {
    const cards = [
        {
        title: "Card 1 Title",
        points: ["Point 1", "Point 2", "Point 3"],
        },
        {
        title: "Card 2 Title",
        points: ["Point 4", "Point 5", "Point 6"],
        },
        {
        title: "Card 3 Title",
        points: ["Point 7", "Point 8", "Point 9"],
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {
        if (isAnimating) return; // Prevent multiple clicks during animation

        setIsAnimating(true);

        setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        setIsAnimating(false);
        }, 500); // Match this duration with CSS transition duration
    };
    const [isAnimating, setIsAnimating] = useState(false);

  return (
    <section className={"about-section"}>
        <SectionHeader title='about'/>

        <div className="rolodex" onClick={handleClick}>
            <div className={`card-container ${isAnimating ? 'animating' : ''}`}>
                <div className="card top-card">
                    <h2>{cards[currentIndex].title}</h2>
                </div>
                <div className="card bottom-card">
                    <ul>
                        {cards[currentIndex].points.map((point, index) => (
                        <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
};




// import React, { useState, useEffect } from "react";
// import "./style.scss";
// import SectionHeader from "../SectionHeader";

// import CardImage from '../../images/pigs.png';


// export default function About() {
//     // Define the array of cards with color, title, bullets, and an image
//     const cards = [
//         {
//             title: "Languages",
//             bullets: [
//                 "English (Native)",
//                 "Italian (Native)",
//                 "German (Intermediate)",
//                 "Japanese (Intermediate)",
//                 "Spanish (Intermediate)",
//                 "French (Beginner)",
//             ],
//             image: CardImage
//         },
//         {
//             title: "Card 2",
//             bullets: [
//                 "Vitae voluptatibus nihil ex",
//                 "Recusandae quibusdam porro",
//                 "Labore delectus in hic facere"
//             ],
//             image: CardImage
//         },
//         {
//             title: "Card 3",
//             bullets: [
//                 "Dolorum repellendus minima",
//                 "Accusantium quod dolorum",
//                 "Voluptatum consequuntur inventore"
//             ],
//             image: CardImage
//         }
//     ];

//     // State to keep track of the current card index
//     const [currentIndex, setCurrentIndex] = useState(0);

//     // Function to handle left arrow click
//     const prevCard = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === 0 ? cards.length - 1 : prevIndex - 1));
//     };

//     // Function to handle right arrow click
//     const nextCard = () => {
//         setCurrentIndex((prevIndex) => (prevIndex === cards.length - 1 ? 0 : prevIndex + 1));
//     };

//     // Event listener for arrow key controls
//     useEffect(() => {
//         const handleKeyDown = (event) => {
//             if (event.key === "ArrowLeft") {
//                 prevCard();
//             } else if (event.key === "ArrowRight") {
//                 nextCard();
//             }
//         };

//         window.addEventListener("keydown", handleKeyDown);

//         // Cleanup the event listener on component unmount
//         return () => {
//             window.removeEventListener("keydown", handleKeyDown);
//         };
//     }, []); // Empty array ensures this runs only on component mount/unmount

//     return (
//         <section className={"about-section"}>
//             <SectionHeader title='about'/>
//             <div className="carousel-container">
//                 <button onClick={prevCard} className="arrow left-arrow">←</button>

//                 <div className="card-image-container">
//                     <div className="card-container">
//                             <div className="card-border"/>
//                             <div className="card" >
//                                 <h2>{cards[currentIndex].title}</h2>
//                                 <ul>
//                                     {cards[currentIndex].bullets.map((bullet, index) => (
//                                         <li key={index}>{bullet}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                     </div>

//                     <div className="image-container">

//                         <img 
//                             src={cards[currentIndex].image} 
//                             alt={cards[currentIndex].title} 
//                             className="carousel-image" 
//                         />
//                     </div>
//                 </div>
                
//                 {/* Right arrow */}
//                 <button onClick={nextCard} className="arrow right-arrow">→</button>
//             </div>
//         </section>
//     );
// }
