import {useMagnetic} from "../../lib/hooks/useMagnetic"
import "./MagneticButton.scss"

type Props = {
    isMagnetic?: boolean,
    customColor?: string,
    text: string,
    type?: "ripple" | "link"
}

export const Button = ({isMagnetic = false, customColor = '#000', text, type = 'ripple'}: Props) => {
    const magnetic = useMagnetic()
    return (
        <button className={`button ${type === 'link' ? 'button--link' : ''}`} data-magnetic={isMagnetic}>
            <span className="button-title">
                <span data-text={text}>
                    {text}
                </span>
            </span>
            {type === 'ripple' && <span className="button-ripple"></span>}
        </button>
    )
}