import {useContext} from "react"
import { Container } from "components/Container"
import { TransitionLink } from "components/Links"
import { Button } from "components/MagneticButton/Button"
import {CursorContext} from "../../lib/context/cursorContext"
import "./footer.scss"

export const Footer = () => {
    const {cursor} = useContext(CursorContext)
    const links = ["Linkedin", "Behance", "Dribble", "Instagram", "Youtube", "Twitter"]

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
        <footer className="footer" onMouseEnter={() => handleCursorInvert(true)} onMouseLeave={() => handleCursorInvert(false)}>
            <Container direction="column" fullwidth>
                <div className="footer-content">
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