import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import HeroContent from './HeroContent';


import people1 from "../assets/people1.jpg";
import people2 from "../assets/people2.jpg";
import laptop1 from "../assets/laptop1.jpg";

interface SlideItem {
  id: number;
  image: any;
  title: string;
  text: string;
}

const Hero = () => {
  // Example data for slides
  const slides: SlideItem[] = [
    {
      id: 1,
      image: people1,
      title: 'Invest with confidence',
      text: "AccunarHub will generate your ideal and passive income stream.",
    },
    {
      id: 2,
      image: people2,
      title: 'Secure and easy way to invest your bitcoin',
      text: "We generate uncommon investment return to your coin",
    },
    {
      id: 3,
      image: laptop1,
      title: 'The future of investment technology is here',
      text: "We are the best investors that can guarantee a return in your investmnet",
    },
    // Add more slides as needed
  ];

  return (
    <div className="carousel-container">
      <Splide
        options={{
          type: 'loop',
          perPage: 1,
          perMove: 1,
          // gap: '1rem',
          pagination: true,
          arrows: true,
          autoplay: true,
          interval: 2000,
          pauseOnHover: true,
          resetProgress: false,
          height: '35rem',
        }}
        aria-label="My Carousel"
      >
        {slides.map((slide) => (
          <SplideSlide key={slide.id}>
            <HeroContent image={slide.image} title={slide.title} text={slide.text}/>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Hero;