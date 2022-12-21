import {useState, useContext, useRef, useEffect, useLayoutEffect} from "react"
import { Container } from "components/Container"
import { TransitionLink } from "components/Links"
import { Button } from "components/MagneticButton/Button"
import {CursorContext} from "../../lib/context/cursorContext"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import "./footer.scss"



export const Footer = () => {
    const {cursor} = useContext(CursorContext)
    const footerRef = useRef(null), footerContentRef = useRef(null)
    const [triggerPoints, setTriggerPoints] = useState("top top")
    const links = ["Linkedin", "Behance", "Dribble", "Instagram", "Youtube", "Twitter"]


    useLayoutEffect(() => {
        // ScrollTrigger.refresh()
        console.log(ScrollTrigger)
    }, [])

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
        window.ScrollTrigger = ScrollTrigger

        updateEndTrigger()
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".featured",
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
                markers: true,
                onEnter: () => {
                    console.log("Entered footer")
                }
            }
        })
        // tl.set(footerContentRef.current, {yPercent: -70})

        console.log(tl)

        tl.fromTo(footerContentRef.current, {yPercent: -70, lazy: false}, {
            yPercent: 0,
            duration: 1.3,
            ease: "Power0.in",
            lazy: false
        })

        window.addEventListener('resize', function(){
            updateEndTrigger()
        })

        return () => {
            tl?.scrollTrigger?.kill();
        }

    }, [])
    
    function updateEndTrigger(){
        if(window.matchMedia("(min-width: 768px)").matches){
            console.log("Above 768px")
            setTriggerPoints("top top")
        } else {
            console.log("Below 768px")
            setTriggerPoints("top 30%")
        }
    }

    function handleCursorInvert(isInverted: boolean){
        if(isInverted){
            cursor.current.addState('-inverse');
        } else {
            cursor.current.removeState('-inverse');
        }
    }

    function handleCursorScale(isScaled: boolean){
        if(isScaled){
            cursor.current.addState('-mf-cursor-md -exclusion')
        } else {
            cursor.current.removeState('-mf-cursor-md -exclusion')
        }
    }

    return (
        <footer className="footer" onMouseEnter={() => handleCursorInvert(true)} onMouseLeave={() => handleCursorInvert(false)} ref={footerRef}>
            <Container direction="column" fullwidth>
                <div className="footer-content" ref={footerContentRef}>
                    <div className="footer-content__top">
                        <div className="footer-content__cta">
                            <h2>Have an idea?</h2>
                            <Button text="Tell us about it" type="link" darkmode />
                        </div>
                    </div>
                    <div className="footer-content__bottom">
                        <div className="footer-content__bottom-left">
                            <Button text="info@cuberto.com" type="link" darkmode />
                            <address>901 N Pitt Str., Suite 170 <br/> Alexandria, VA 22314, USA</address>
                            <TransitionLink link="Privacy policy" size="sm"/>
                        </div>
                        <div className="footer-content__bottom-right">
                            <div className="footer-content__bottom-links" onMouseEnter={() => handleCursorScale(true)} onMouseLeave={() => handleCursorScale(false)}>
                                {links.map(link => (
                                    <TransitionLink link={link} size="md" darkmode />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}