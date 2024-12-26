import "../styles/components/MoreInfo.scss";
import people8 from "../assets/people8.jpg";

function MoreInfo() {
    return (
        <>
            <div className="more_info_cont">
                <div className="info_image">
                    <img src={people8} alt="pics" />
                </div>
                <div className="info_text">
                    <div className="header">
                        We Are Ready To Fly With You
                    </div>
                    <div>
                        We’re Perzillon Limited, a financial service that makes it fast, safe and fun to invest digital currency anywhere in the world.
                        We believe that the future of money is one where we the people are in control of our own economy.
                    </div>

                    <div>
                        A future where there’s no place for middlemen, hidden fees and fine print.

                        To deliver on that promise, we have come to work every day since 2007 to create the simplest financial service out there - spoken 
                        in a language you can understand and backed by customer service you can count on
                    </div>
                </div>
            </div>

            <div className="big_text">
                The Best Experience Is On Your Side
            </div>
            
            {/* <div className="after_hero_container">
                {cardDetails.map((card)=> (
                    <Cards key={card.id} title={card.title} text={card.text} image={card.image}/>
                ))}
            </div> */}
        </>
    )
}

export default MoreInfo;

                

                