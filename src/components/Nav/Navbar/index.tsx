import { useEffect, useRef } from "react"
import {Link} from "react-router-dom"
import {gsap} from "gsap"
import {Sprite} from "../../Sprite" 
// import {ReactComponent as Logo} from "@images/icons/svgsprites.svg"
import styles from "./Navbar.module.scss"
import {MagneticButton} from "../../MagneticButton"
import {Menu} from "../Menu"

export const Navbar = () => {

    const nav = useRef<HTMLElement|any>(null)

    useEffect(() => {
            gsap.fromTo(nav.current, {autoAlpha: 0}, {autoAlpha: 1, duration: 1.5, delay: 0.3, ease: "Power0.in"})
    }, [])

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
                        <MagneticButton type="circular" />
                    </div>
                </div>
            </div>
            <Menu />
        </nav>
    )
}