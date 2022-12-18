import { useEffect, useRef } from "react"
import styles from "./Header.module.scss"
import classnames from "classnames"
import { HeaderItem } from "./HeaderItem"
import {gsap} from "gsap"
import { CustomEase } from "gsap/CustomEase";
import brandingHeader from "../../videos/brandingHeader.mp4"
import { Container } from "components/Container"

type Props = {
    slideIn?: boolean
}

export const Header = ({slideIn}: Props) => {
    const isCondensedLayout = window.matchMedia('(max-width: 1199px)').matches
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
            .fromTo(DOM.header.current, {y: 100, autoAlpha: 0.8}, {autoAlpha: 1, y: 0, duration: isCondensedLayout ? 0.5 : 1, ease: "Power2.out"}, 0)
            .add("revealLinks")
            .fromTo(".mask2", {height: 0}, {height: "100%"}, "revealLinks-=0.1")
            .fromTo([DOM.headerLink.current, DOM.headerLink2.current, DOM.headerLink3.current], {y: 100, autoAlpha: 0.8}, {autoAlpha: 1, y: 0, duration: isCondensedLayout ? 0.5 : 1.5, stagger: 0.17, ease: "Power2.out"}, "revealLinks-=0.1")
    }, [])


    return (
        <header className={`${slideIn ? 'slide-in' : ''} ${styles["header"]}`}>
            <Container direction="row" mobileColumn>
                <div className={styles["header-mobile-video"]}>
                    <div className={styles["header-mobile-video__wrapper"]}>
                        <video src={brandingHeader} autoPlay loop muted></video>
                    </div>
                </div>
                <div className={classnames(styles["header-content"])}>
                    <div className={classnames(styles["header-title"], "title")}>
                        <span className="mask">
                            <h1 ref={DOM.header}>We make it happen</h1>
                        </span>
                    </div>
                    <div className={classnames(styles["header-items"], "links-title")}>
                        <HeaderItem ref={DOM.headerLink} link="/" text="Websites" id="websites"/>
                        <HeaderItem ref={DOM.headerLink2} link="/" text="Apps" textAlt="Applications" id="apps" />
                        <HeaderItem ref={DOM.headerLink3} link="/" text="Branding" id="branding"/>
                    </div>
                </div>
            </Container>
        </header>
    )
}