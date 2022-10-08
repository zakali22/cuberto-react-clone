import styles from "./Header.module.scss"
import classnames from "classnames"
import { HeaderItem } from "./HeaderItem"
import { MagneticButton } from "@components/MagneticButton"

export const Header = () => {
    return (
        <>
        <MagneticButton />
        <header className={styles["header"]}>
            <div className={classnames(styles["header-content"], styles["container"])}>
                <div className={styles["header-title"]}>
                    <h1>We make it happen</h1>
                </div>
                <div className={styles["header-items"]}>
                    <HeaderItem link="/" text="Websites"/>
                    <HeaderItem link="/" text="Apps"/>
                    <HeaderItem link="/" text="Branding"/>
                </div>
            </div>
        </header>
        </>
    )
}