import "@images/icons/svgsprites.svg"
import SpriteSVG from "./SpriteSVG"

export const Sprite = () => {
    return (
        <>
            <SpriteSVG />
            <svg className=""><use xlinkHref="#logo"></use></svg>
        </>
    )
}