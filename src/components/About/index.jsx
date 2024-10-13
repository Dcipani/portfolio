import SectionHeader from "../SectionHeader";
import './style.scss';

const About = () => {  
    const cards = [
        { title: 'education', points: ['i', 'go', 'to', ' school', 'sometimes'] },
        { title: 'experience', points: ['h', 'e', 'l', ' l', 'o'] },
        { title: 'languages', points: ['english', 'italian', 'german', ' japanese', 'spanish', 'french'] },
    ];

    
    const cardPositions = [
        { cx: 58, cy: 100 },
        { cx: 186, cy: 400 },
        { cx: 0, cy: 750 }
    ];


    return (
      <>
        {/* <section className='about-section'> */}
        <SectionHeader title="about" />
        <svg id="svg" viewBox="0 0 900 1800" preserveAspectRatio="xMidYMax meet">
          <path
            className="theLine"
            d="M -5,0
            Q 450 230 300 450 
            T 130 750
            Q 100 850 300 1000
            T 150 1200"
            fill="none"
            stroke="red"
            strokeWidth="10px"
            />
    
          {cards.map((card, index) => (
            <foreignObject key={index} x={cardPositions[index]?.cx} y={cardPositions[index]?.cy} width="300" height="300">
              <div className="card-wrapper">
                <div className="card">
                  <div className="card-hole" />
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
            </foreignObject>
          ))}
        </svg>

        {/* </section> */}
        </>
    );
};

export default About;

/*             
            <div className="corkboard" style={{ position: 'relative' }}>
                {cards.map((card, index) => (
                    <div key={index} className="card-wrapper">
                        <div className="card">
                            <div 
                                className="card-hole" 
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
            </div> */