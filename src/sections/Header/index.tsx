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
            .to(".title .mask", {height: "100%"})
            .fromTo(DOM.header.current, {y: 100, autoAlpha: 0.8}, {autoAlpha: 1, y: 0, duration: 1, ease: "Power2.out"}, 0)
            .add("revealLinks")
            .fromTo(".mask2", {height: 0}, {height: "100%"}, "revealLinks-=0.1")
            .fromTo([DOM.headerLink.current, DOM.headerLink2.current, DOM.headerLink3.current], {y: 100, autoAlpha: 0.8}, {autoAlpha: 1, y: 0, duration: 1.5, stagger: 0.17, ease: "Power2.out"}, "revealLinks-=0.1")
    }, [])


    return (
        <header className={styles["header"]}>
            <div className={classnames(styles["header-content"], styles["container"])}>
                <div className={classnames(styles["header-title"], "title")}>
                    <span className="mask">
                        <h1 ref={DOM.header}>We make it happen</h1>
                    </span>
                </div>
                <div className={classnames(styles["header-items"], "links-title")}>
                    <HeaderItem ref={DOM.headerLink} link="/" text="Websites"/>
                    <HeaderItem ref={DOM.headerLink2} link="/" text="Apps"/>
                    <HeaderItem ref={DOM.headerLink3} link="/" text="Branding"/>
                </div>
            </div>
        </header>
    )
}