import {Link} from "react-router-dom"
import {Sprite} from "@components/Sprite" 
// import {ReactComponent as Logo} from "@images/icons/svgsprites.svg"

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-wrapper">
                <div className="navbar-left">
                    <Link to="/">
                        <Sprite />
                    </Link>
                </div>

                <div className="navbar-right">

                </div>
            </div>
        </nav>
    )
}