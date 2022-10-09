import React, {useEffect, useRef, useState} from "react"
import { gsap } from 'gsap';
import { lerp, getMousePos } from '../../lib/utils';
import eventBus from "../../lib/EventBus"
import styles from "./Cursor.module.scss"

export const Cursor = () => {

    const [mousepos, setMousePos] = useState({x: 0, y: 0})
    const [bounds, setBounds] = useState<any>()
    const [renderedStyles, setRenderedStyles] = useState({
        tx: {previous: 0, current: 0, amt: 0.2},
        ty: {previous: 0, current: 0, amt: 0.2},
        scale: {previous: 1, current: 1, amt: 0.2},
        opacity: {previous: 1, current: 1, amt: 0.2}
    })

    let DOM = {
        el: useRef<HTMLElement|any>(null),
    }

    useEffect(() => {
        window.addEventListener('mousemove', ev => setMousePos(getMousePos(ev)))
        DOM!.el!.current!.style!.opacity = 0;
        setBounds(DOM?.el?.current?.getBoundingClientRect())
        window.addEventListener('mousemove', onMouseMoveEv);

        // Capture the dispatched enter/leave actions by MagneticButton
        // eventBus.on('enter', enter)
        // eventBus.on('leave', leave)
    }, [])

    useEffect(() => { // Whenever the mouse pos changes recalculate everything
        onMouseMoveEv()
    }, [mousepos])

    function onMouseMoveEv(){
        console.log("Moving mouse")
        setRenderedStyles((prevState) => ({
            ...prevState, 
            tx: {
                ...prevState.tx,
                previous: mousepos.x - (bounds?.width)/2,
                current: mousepos.x - (bounds?.width)/2
            }, 
            ty: {
                ...prevState.ty,
                previous: mousepos.y - bounds?.height/2,
                current: mousepos.y - bounds?.height/2
            }
        }))

        eventBus.on('enter', enter)
        eventBus.on('leave', leave)

        gsap.to(DOM.el, {duration: 0.9, ease: 'Power3.easeOut'});
        requestAnimationFrame(() => render());
        window.removeEventListener('mousemove', onMouseMoveEv);
    }


    function render(){
        setRenderedStyles((prevState) => ({
            ...prevState, 
            tx: {
                ...prevState.tx,
                current: mousepos.x - (bounds?.width)/2
            }, 
            ty: {
                ...prevState.ty,
                current: mousepos.y - bounds?.height/2
            }
        }))


        for (const key in renderedStyles ) {
            setRenderedStyles((prevState) => {
                type ObjectKey = keyof typeof prevState

                return ({
                    ...prevState,
                    [key]: {
                        ...prevState[key as ObjectKey],
                        previous: lerp(prevState[key as ObjectKey].previous, prevState[key as ObjectKey].current, prevState[key as ObjectKey].amt)
                    }
                })
            })
        
        }
               
        if(DOM.el.current){
            DOM.el.current.style.transform = `translateX(${(renderedStyles['tx'].previous)}px) translateY(${renderedStyles['ty'].previous}px) scale(${renderedStyles['scale'].previous})`;
            DOM.el.current.style.opacity = renderedStyles['opacity'].previous;
        }
        // requestAnimationFrame(() => render());
    }


    function enter(e: any){
        setRenderedStyles((prevState) => ({
            ...prevState, 
            scale: {
                ...prevState.scale,
                current: 4
            }, 
            opacity: {
                ...prevState.opacity,
                current: 0
            }
        }))
    }

    
    function leave(){
        setRenderedStyles((prevState) => ({
            ...prevState, 
            scale: {
                ...prevState.scale,
                current: 1
            }, 
            opacity: {
                ...prevState.opacity,
                current: 1
            }
        }))
    }

    return (
        <svg className={styles["cursor"]} width="25" height="25" viewBox="0 0 25 25" ref={DOM.el}>
            <circle className={styles["cursor__inner"]} cx="12.5" cy="12.5" r="6.25" />
        </svg>
    )
}