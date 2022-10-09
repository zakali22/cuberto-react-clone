import styles from "./Header.module.scss"
import classnames from "classnames"
import { HeaderItem } from "./HeaderItem"
import {gsap} from "gsap"
import { useEffect, useRef } from "react"

export const Header = () => {
    const DOM = {
        header: useRef<HTMLElement|any>(null),
        headerLink: useRef<HTMLElement|any>(null),
        headerLink2: useRef<HTMLElement|any>(null),
        headerLink3: useRef<HTMLElement|any>(null),
    }

    useEffect(() => {
        const tl = gsap.timeline()
        tl
            .to(DOM.header.current, {y: 0, duration: 0.8, ease: "Power2.in"})
            .to([DOM.headerLink.current, DOM.headerLink2.current, DOM.headerLink3.current], {y: 0, duration: 1, stagger: 0.2, ease: "Power2.out"})
    }, [])


    return (
        <header className={styles["header"]}>
            <div className={classnames(styles["header-content"], styles["container"])}>
                <div className={styles["header-title"]}>
                    <span className="mask" >
                        <h1 ref={DOM.header}>We make it happen</h1>
                    </span>
                </div>
                <div className={styles["header-items"]}>
                    <HeaderItem ref={DOM.headerLink} link="/" text="Websites"/>
                    <HeaderItem ref={DOM.headerLink2} link="/" text="Apps"/>
                    <HeaderItem ref={DOM.headerLink3} link="/" text="Branding"/>
                </div>
            </div>
        </header>
    )
}