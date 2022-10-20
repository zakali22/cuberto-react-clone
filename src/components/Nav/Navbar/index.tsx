import { useState, useEffect, useRef } from "react"
import {Link} from "react-router-dom"
import {gsap} from "gsap"
import {Sprite} from "../../Sprite" 
// import {ReactComponent as Logo} from "@images/icons/svgsprites.svg"
import styles from "./Navbar.module.scss"
import {MagneticButton} from "../../MagneticButton"
import {Menu} from "../Menu"

export const Navbar = () => {
    const [isMenuOpened, setIsMenuOpened] = useState(false)
    const nav = useRef<HTMLElement|any>(null)

    useEffect(() => {
            gsap.fromTo(nav.current, {autoAlpha: 0}, {autoAlpha: 1, duration: 1.5, delay: 0.3, ease: "Power0.in"})
    }, [])

    useEffect(() => {
        const tl = gsap.timeline()
        const firstSpan = document.querySelector(".menu-box span:first-of-type")
        const secondSpan = document.querySelector(".menu-box span:last-of-type")
        
        if(isMenuOpened){
            tl
                .to(firstSpan, {x: -10, opacity: 0, duration: 0.3})
                .to(secondSpan, {x: 10, opacity: 0, duration: 0.3}, 0)
                .set(firstSpan, {rotate: 45, y: -10})
                .set(secondSpan, {rotate: -45, y: -10})
                .to(firstSpan, {y: 1, x: 0, opacity: 1, duration: 0.3})
                .to(secondSpan, {y: -1, x: -1, opacity: 1, duration: 0.3}, "-=0.1")
        } else {
            tl
                .to(firstSpan, {y: 0, x: 0, rotation: 0, opacity: 1, duration: 0.2})
                .to(secondSpan, {y: 0, x: 0, rotation: 0, opacity: 1, duration: 0.2}, 0)
                .add("translate")
                .to(firstSpan, {y: -1, duration: 0.2}, "translate")
                .to(secondSpan, {y: 4, duration: 0.2}, "translate")
        }
    }, [isMenuOpened])

    function handleMenuOpen(){
        setIsMenuOpened(!isMenuOpened)
    }

    return (
        <nav className={styles['navbar']}>
            <div className={styles['navbar-wrapper']} ref={nav}>
                <div className={styles['navbar-left']}>
                    <Link to="/">
                        <Sprite className="svg-logo"/>
                    </Link>
                </div>

                <div className={styles['navbar-right']}>
                    <Link to="">
                        our showreel
                    </Link>
                    <div className={styles['navbar-toggle']}>
                        <MagneticButton type="circular" isMenuOpened={isMenuOpened} handleMenuOpen={handleMenuOpen}/>
                    </div>
                </div>
            </div>
            <Menu isMenuOpened={isMenuOpened} handleMenuOpen={handleMenuOpen} />
        </nav>
    )
}