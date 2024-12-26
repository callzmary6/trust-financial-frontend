import "../styles/components/AfterHero.scss";
import Cards from "./Cards";

const cardDetails = [
    {
        id: 1,
        image: "https://perzillonlimited.com/assets/img/featured1.jpg",
        title: 'Experience',
        text: "Our advisers have education and experience in the financial industry that is reflected in their knowledge and expertise",
      },
      {
        id: 2,
        image: "https://perzillonlimited.com/assets/img/featured2.jpg",
        title: 'Commitment',
        text: "We hold ourselves to a fiduciary standard that puts the best interests of our clients first",
      },
      {
        id: 3,
        image: "https://perzillonlimited.com/assets/img/featured3.jpg",
        title: 'Service',
        text: "We give each client the intimate attention deserved to achieve peace of mind in their finances",
      },
]

function AfterHero() {
    return (
        <div className="after_hero_container">
            {cardDetails.map((card)=> (
                <Cards key={card.id} title={card.title} text={card.text} image={card.image}/>
            ))}
        </div>
    )
}

export default AfterHero;