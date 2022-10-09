import { useEffect, useRef } from "react"
import {Link} from "react-router-dom"
import {gsap} from "gsap"
import {Sprite} from "@components/Sprite" 
// import {ReactComponent as Logo} from "@images/icons/svgsprites.svg"
import styles from "./Navbar.module.scss"
import {MagneticButton} from "@components/MagneticButton"

export const Navbar = () => {

    const nav = useRef<HTMLElement|any>(null)

    useEffect(() => {
            gsap.fromTo(nav.current, {autoAlpha: 0}, {autoAlpha: 1, duration: 1.5, delay: 0.3, ease: "Power0.in"})
    }, [])

    return (
        <nav className={styles['navbar']} ref={nav}>
            <div className={styles['navbar-wrapper']}>
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
        </nav>
    )
}