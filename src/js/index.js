import {preloadFonts} from './utils';
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Splitting from "splitting";

Splitting();

const fadeTextBody = [...document.querySelectorAll('.content__title[data-splitting][data-effect16]')];

// Lenis smooth scrolling
let lenis;

// Initialize Lenis smooth scrolling
const initSmoothScrolling = () => {
	
    lenis = new Lenis({
		lerp: 0.2,
		smooth: true
	});

    lenis.on('scroll', () => ScrollTrigger.update());

	const scrollFn = (time) => {
		lenis.raf(time);
		requestAnimationFrame(scrollFn);
	};
	
    requestAnimationFrame(scrollFn);

};

// GSAP Scroll Triggers
const scroll = () => {
    
    fadeTextBody.forEach(title => {
        
        gsap.fromTo(title, {
            transformOrigin: '0% 50%',
            rotate: 0
        }, {
            ease: 'none',
            rotate: 0,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom',
                end: 'top top',
                scrub: true,
            }
        });

        gsap.fromTo(title.querySelectorAll('.word'), {
            'will-change': 'opacity',
            opacity: 0.1
        }, 
        {
            ease: 'none',
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: title,
                start: 'top bottom-=30%',
                end: 'center top+=30%',
                scrub: true,
            }
        });

    });
};

// Smooth scroll function
const smoothScroll = () => {
    const links = document.querySelectorAll('a[data-scroll-to]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 50
                    },
                    ease: "power3.inOut",
                    onComplete: () => {
                        // Remove the hash from the URL without affecting the browser history
                        history.replaceState('', document.title, window.location.pathname + window.location.search);
                    }
                });
            }
        });
    });
};

// Preload images and fonts
preloadFonts('cvn8slu').then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');
    // Lenis (smooth scrolling)
    // initSmoothScrolling();
    // GSAP Scroll Triggers
    scroll();
    // Initialize smooth scroll
    // smoothScroll();
});
