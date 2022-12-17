import {useRef} from "react"
import {useMagnetic} from "../../lib/hooks/useMagnetic"
import "./MagneticButton.scss"

type Props = {
    isMagnetic?: boolean,
    customColor?: string,
    text: string,
    type?: "ripple" | "link",
    darkmode?: boolean
}

export const Button = ({isMagnetic = false, customColor = '#000', text, type = 'ripple', darkmode = false}: Props) => {
    const magnetic = useMagnetic()
    const buttonRef = useRef<HTMLButtonElement>(null)

    if(isMagnetic){
        buttonRef.current?.setAttribute('data-magnetic', "true")
    } else {
        buttonRef.current?.removeAttribute('data-magnetic')
    }

    return (
        <button className={`button ${darkmode ? 'button--dark' : ''} ${type === 'link' ? 'button--link' : ''}`} ref={buttonRef}>
            <span className="button-title">
                <span data-text={text}>
                    {text}
                </span>
            </span>
            {type === 'ripple' && <span className="button-ripple"></span>}
        </button>
    )
}