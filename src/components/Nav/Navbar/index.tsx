import {Link} from "react-router-dom"
import {Sprite} from "@components/Sprite" 
// import {ReactComponent as Logo} from "@images/icons/svgsprites.svg"
import styles from "./Navbar.module.scss"

export const Navbar = () => {
    return (
        <nav className={styles['navbar']}>
            <div className={styles['navbar-wrapper']}>
                <div className={styles['navbar-left']}>
                    <Link to="/">
                        <Sprite className="svg-logo"/>
                    </Link>
                </div>

                <div className={styles['navbar-right']}>
                    <Link to="">
                        our showreel
                    </Link>
                    <div className={styles['navbar-toggle']}>
                        <button>
                            <span>menu</span>
                            <span className={styles["navbar-menu-box"]}>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}