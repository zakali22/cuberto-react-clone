import {Link} from "react-router-dom"
import styles from "./Menu.module.scss"

export const Menu = () => {
    const links = ["Linkedin", "Behance", "Dribble", "Instagram", "Youtube", "Twitter", "Github"]
    const links2 = ["Work", "About", "Services", "Tutorials", "Contact"]

    return (
        <div className={styles["navbar-menu"]}>
            <div className={styles["navbar-menu__overlay"]}></div>
            <div className={styles["navbar-menu__content"]}>
                <div className={styles["navbar-menu__content-wrapper"]}>
                    <div className={styles["navbar-menu__links"]}>
                        <div className={styles["navbar-menu__links-left"]}>
                            <p className={styles["navbar-menu__title"]}>Socials</p>
                            <div className={styles["navbar-menu__links-list"]}>
                                {links.map(link => (
                                    <div className={styles["navbar-link"]}>
                                        <Link to={link.toLowerCase()} className={styles["navbar-link__item"]}>
                                            <em>
                                                <span data-text={link}>
                                                    {link}
                                                </span>
                                            </em>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={styles["navbar-menu__links-right"]}>
                            <p className={styles["navbar-menu__title"]}>Menu</p>
                            <div className={styles["navbar-menu__links-list"]}>
                                {links2.map(link => (
                                    <div className={styles["navbar-link"]}>
                                        <Link to={link.toLowerCase()} className={styles["navbar-link__item"]}>
                                            <em>
                                                <span data-text={link}>
                                                    {link}
                                                </span>
                                            </em>
                                        </Link>
                                    </div>
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