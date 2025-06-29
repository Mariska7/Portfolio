import './parallax.css';
import starryskye from './starryskye.jpg';
import desertmountains from './desertmontains.png';

import { ParallaxBanner } from 'react-scroll-parallax';
import { useEffect, useState } from 'react';

const ParallaxEffect = () => {
    const [isVisible, setIsVisible] = useState(false);

    const checkVisibility = () => {
        // Use querySelector to get the element
        const element = document.querySelector('.parallaxtext-container');
        
        // Ensure element is not null and typecast to HTMLElement
        if (element && element instanceof HTMLElement) {
            const rect = element.getBoundingClientRect();
            const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
            setIsVisible(isInView);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        
        // Initial check on load
        checkVisibility();

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('scroll', checkVisibility);
    }, []);

    return (
        <ParallaxBanner
            layers={[
                { image: starryskye, speed: -20 },
                {
                    speed: -30,
                    children: (
                        <div
                            className={`parallaxtext-container ${isVisible ? 'visible' : ''}`}
                        >
                            <h1 className="parallaxtext">Hello World!</h1>
                        </div>
                    ),
                },
                {
                    speed: -10,
                    children: (
                        <div className="mountain-container">
                            <img src={desertmountains} alt="Desert Mountains" className="mountain-image" />
                        </div>
                    ),
                },
            ]}
            className="image-align"
        />
    );
};

export default ParallaxEffect;
