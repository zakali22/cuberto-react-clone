import {Link} from "react-router-dom"
import styles from "./TransitionLink.module.scss"

interface Props {
    link: string,
    size?: "sm" | "md" | "lg",
    darkmode?: boolean
}

export const TransitionLink = ({link, size = "md", darkmode = false}: Props) => {
    return (
        <Link to={link.toLowerCase()} className={`${styles["t-link__item"]} ${styles[size]} ${darkmode ? styles["t-link__item--dark"] :  ''}`}>
            <em>
                <span data-text={link}>
                    {link}
                </span>
            </em>
        </Link>
    )
}