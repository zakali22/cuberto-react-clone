import {Link} from "react-router-dom"
import styles from "./TransitionLink.module.scss"

interface Props {
    link: string,
    size?: "sm" | "md" | "lg"
}

export const TransitionLink = ({link, size = "md"}: Props) => {
    return (
        <Link to={link.toLowerCase()} className={`${styles["t-link__item"]} ${styles[size]}`}>
            <em>
                <span data-text={link}>
                    {link}
                </span>
            </em>
        </Link>
    )
}