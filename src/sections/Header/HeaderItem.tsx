import React, {useEffect, useRef, useState} from "react"
import { Link } from "react-router-dom"
import styles from "./Header.module.scss"
import eventBus from "../../lib/EventBus"

interface Props {
    link: string
    text: string
    id: string
}

export const HeaderItem = React.forwardRef<any, Props>((props: Props, ref) => { // Define the forwardRef types <refType, PropType>
    const [hoverSectionEl, setHoverSectionEl] = useState<any>()    

    const DOM = {
        headerArea: useRef<HTMLElement|any>(null)
    }

    function cursorExpand(e: any){
        const target = e.target as HTMLElement
        // console.log(target.getAttribute('id'))
        setHoverSectionEl(target.getAttribute('id'))
        if(hoverSectionEl === 'websites' || hoverSectionEl === 'apps' || hoverSectionEl === 'branding'){
            requestAnimationFrame(() => {
                console.log("Hovergin over red")
                eventBus.dispatch('headerHoverEnter', hoverSectionEl)
            })
        }
    }
    
    
    
    useEffect(() => {
        let hoverArea = DOM?.headerArea?.current
        hoverArea.addEventListener('mousemove', cursorExpand)
        hoverArea.addEventListener('mouseleave', () => {
            requestAnimationFrame(() => {
                eventBus.dispatch('headerHoverLeave')
            })
        })
    }, [hoverSectionEl])

    

    return (
        <div className={styles["header-item"]} ref={DOM.headerArea}>
            <div className={styles["hover-area"]}  id={props.id}></div>
            <Link to={props.link} id={props.id}>
                <span className="mask mask2" id={props.id}>
                    <span ref={ref} id={props.id}>{props.text}</span>
                </span>
            </Link>
        </div>
    )
})