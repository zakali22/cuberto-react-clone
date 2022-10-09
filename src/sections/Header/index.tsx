import styles from "./Header.module.scss"
import classnames from "classnames"
import { HeaderItem } from "./HeaderItem"
import {gsap} from "gsap"
import { CustomEase } from "gsap/CustomEase";
import { useEffect, useRef } from "react"

export const Header = () => {
    const DOM = {
        header: useRef<HTMLElement|any>(null),
        headerLink: useRef<HTMLElement|any>(null),
        headerLink2: useRef<HTMLElement|any>(null),
        headerLink3: useRef<HTMLElement|any>(null),
    }

    useEffect(() => {
        gsap.registerPlugin(CustomEase)
        const tl = gsap.timeline()
        tl
            .fromTo(DOM.header.current, {height: "0%"}, {height: "100%", duration: 1, stagger: 0.2, ease: "Sine.inOut"})
            .fromTo([DOM.headerLink.current, DOM.headerLink2.current, DOM.headerLink3.current], {height: "0%"}, {height: "110%", duration: 1.7, stagger: 0.2, ease: CustomEase.create("custom", "M0,0 C0.266,0.412 0.436,0.654 0.565,0.775 0.609,0.816 0.78,0.888 1,0.888 ")}, "-=0.5")
    }, [])


    return (
        <header className={styles["header"]}>
            <div className={classnames(styles["header-content"], styles["container"])}>
                <div className={styles["header-title"]}>
                    <span className="mask" ref={DOM.header}>
                        <h1>We make it happen</h1>
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