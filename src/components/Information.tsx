import "../styles/components/AfterHero.scss";
import Cards from "./Cards";
import people3 from "../assets/people3.jpg";
import people4 from "../assets/people4.jpg";
import people5 from "../assets/people5.jpg";


const cardDetails = [
  {
    id: 2,
    image: people3,
    title: 'Registered Company',
    text: "Our company has legal registration in New Zealand. The Certificate of official registration can be found on our website"
  },
  {
    id: 3,
    image: people5,
    title: 'Steady Income',
    text: "The computer-based analytical system recognizes every fluctuations in cryptocurrency and makes successful predictions for the nearest future",
  },
  {
    id: 5,
    image: people4,
    title: 'Investment Strategies',
    text: "Our expertise helps us to develop a number of investment programs that have already been used for several years",
  },
]

function Information() {
    return (
        <div className="after_hero_container">
            {cardDetails.map((card)=> (
                <Cards key={card.id} title={card.title} text={card.text} image={card.image}/>
            ))}
        </div>
    )
}

export default Information;