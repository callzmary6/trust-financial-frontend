import "../styles/components/Cards.scss";

interface CardsProps {
    image: string;
    text: string;
    title: string;
}

function Cards({title, image, text}: CardsProps) {
    return (
        <div className="cards_cont">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <div className="title">{title}</div>
            <div className="text">{text}</div>
        </div>
    )
}

export default Cards;