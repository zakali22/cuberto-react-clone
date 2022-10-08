import "@images/icons/svgsprites.svg"
import SpriteSVG from "./SpriteSVG"
import styles from "./Sprite.module.scss"

interface Props {
    className: string
}

export const Sprite = ({className}: Props) => {
    return (
        <>
            <SpriteSVG />
            <svg className={styles[className]}><use xlinkHref="#logo"></use></svg>
        </>
    )
}