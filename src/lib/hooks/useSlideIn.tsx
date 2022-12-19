import {useEffect} from "react"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger);

export const useSlideIn = () => {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const slideInEls = document.querySelectorAll('.slide-in')
        slideInEls.forEach((slideInEl) => {
            gsap.fromTo(slideInEl, { y: 50, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.6, scrollTrigger: {
                trigger: slideInEl, 
                start: "top center+=50",
                // end: "bottom "
                // markers: true
            }})
        })
    }, [])

}