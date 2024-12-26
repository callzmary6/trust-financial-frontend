import "../styles/components/HeroContent.scss";

interface HeroContentProps {
    image: any;
    text: string;
    title: string;
}

function HeroContent({image, title, text}: HeroContentProps) {
    return (
        <div className="hero_container">
            <img src={image} alt="" />
            <div className="hero_container_typo">
                <div className="hero_container_typo_title">
                    {title}
                </div>
                <div className="hero_container_typo_text">
                    {text}
                </div>
                <button>Get Started</button>
            </div>
        </div>
    )
}

export default HeroContent;