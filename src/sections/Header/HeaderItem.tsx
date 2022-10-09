import React from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.scss"

interface Props {
    link: string
    text: string
}

export const HeaderItem = React.forwardRef<any, Props>((props: Props, ref) => { // Define the forwardRef types <refType, PropType>

    return (
        <div className={styles["header-item"]}>
            <Link to={props.link}>
                <span className="mask" ref={ref}>
                    <span>{props.text}</span>
                </span>
            </Link>
        </div>
    )
})