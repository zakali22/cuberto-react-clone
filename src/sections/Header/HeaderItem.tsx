import { Link } from "react-router-dom"
import styles from "./Header.module.scss"

interface Props {
    link: string
    text: string
}

export const HeaderItem = ({link, text}: Props) => {
    return (
        <div className={styles["header-item"]}>
            <Link to={link}>
                <span>{text}</span>
            </Link>
        </div>
    )
}