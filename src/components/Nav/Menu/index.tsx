import {Link} from "react-router-dom"
import { TransitionLink } from "components/Links"
import styles from "./Menu.module.scss"
import classnames from "classnames"
import { useEffect, useState } from "react"

interface Props {
    isMenuOpened: boolean
    handleMenuOpen: () => void
}

export const Menu = ({isMenuOpened, handleMenuOpen}: Props) => {
    const links = ["Linkedin", "Behance", "Dribble", "Instagram", "Youtube", "Twitter", "Github"]
    const links2 = ["Work", "About", "Services", "Tutorials", "Contact"]

    const [isTouchScreen, setIsTouchScreen] = useState(false)

    useEffect(() => {
        checkTouchScreen()
        window.addEventListener('resize', checkTouchScreen)
    }, [isTouchScreen])

    function checkTouchScreen(){
        if(window.matchMedia("(pointer: coarse)").matches){
            console.log("Is touch screen")
            setIsTouchScreen(true)
        } else {
            setIsTouchScreen(false)
        }
    }

    return (
        <div className={`${styles["navbar-menu"]} ${isMenuOpened ? styles["menu-open"] : ''} ${isTouchScreen ? styles["full-width"] : ''}`}>
            <div className={styles["navbar-menu__overlay"]} onClick={handleMenuOpen}></div>
            <div className={styles["navbar-menu__content"]}>
                <div className={styles["navbar-menu__content-wrapper"]}>
                    <div className={styles["navbar-menu__links"]}>
                        <div className={styles["navbar-menu__links-left"]}>
                            <p className={styles["navbar-menu__title"]}>Socials</p>
                            <div className={styles["navbar-menu__links-list"]}>
                                {links.map(link => (
                                    <TransitionLink link={link} size="sm"/>
                                ))}
                            </div>
                        </div>
                        <div className={styles["navbar-menu__links-right"]}>
                            <p className={styles["navbar-menu__title"]}>Menu</p>
                            <div className={styles["navbar-menu__links-list"]}>
                                {links2.map(link => (
                                    <TransitionLink link={link} size="lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles["navbar-menu__contact"]}>
                    <p className={styles["navbar-menu__title"]}>Get in touch</p>
                    <a href="/">info@cuberto.com</a>
                </div>
            </div>
        </div>
    )
}