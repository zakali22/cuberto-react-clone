import React, {useCallback, useEffect, useRef, useState} from "react"
import classnames from "classnames"
import {gsap} from 'gsap'
import { lerp, getMousePos, calcWinsize, distance, getRandomFloat } from '../../lib/utils';
import eventBus from "../../lib/EventBus"
import {useMagnetic} from "../../lib/hooks/useMagnetic"


interface Props {
    children?: React.ReactElement,
    classname?: string,
    type?: string,
    isMenuOpened?: boolean,
    handleMenuOpen?: () => void
}

export const CircularButton = ({children, classname, type, isMenuOpened, handleMenuOpen}: Props) => {
    const [renderedStyles, setRenderedStyles] = useState({
        tx: {previous: 0, current: 0, amt: 0.1},
        ty: {previous: 0, current: 0, amt: 0.1},
        scale: {previous: 1, current: 1, amt: 0.2}
    })

    /** State */
    const [hover, setHover] = useState(false)
    const [rect, setRect] = useState<any>()
    const [distanceToTrigger, setDistanceToTrigger] = useState(0)
    const [mousepos, setMousePos] = useState({x: 0, y: 0})
    const [winsize, setWinSize] = useState<{}>()

    let DOM = {
        wrapperEl: useRef<HTMLElement|any>(null),
        el: useRef<HTMLElement|any>(null),
        text: useRef<HTMLElement|any>(null),
        textInner: useRef<HTMLElement|any>(null),
        deco: useRef<HTMLElement|any>(null),
        filler: useRef<HTMLElement|any>(null),
    }

    const bodyColor = getComputedStyle(document.body).getPropertyValue('--color-bg');

    const calculateSizePosition = useCallback(() => {
        // size/position
        setRect(DOM?.wrapperEl?.current?.getBoundingClientRect())
        // the movement will take place when the distance from the mouse to the center of the button is lower than this value
        setDistanceToTrigger(rect?.width*0.8) // Radius around the button when movement starts
        // console.log("calculateSizePosition")
    }, [DOM?.el, rect?.width])

    const onResize = useCallback(() => {
        calculateSizePosition();
    }, [calculateSizePosition])

    const initEvents = useCallback(() => {
        window.addEventListener('resize', onResize);
        // console.log("initEvents")
    }, [onResize])


    const enter = useCallback(() => {
        setHover(true)

        // console.log(DOM.el.current)

        DOM?.el?.current?.classList.add('button--hover');
        document.body.classList.add('active');

        setRenderedStyles((prevState) => ({
            ...prevState,
            scale: {
                ...prevState.scale,
                current: 1.3
            }
        }))

        // Dispatch an enter event
        eventBus.dispatch('enter')
        
        gsap.killTweensOf(DOM.filler);
        gsap.killTweensOf(DOM.textInner);
        gsap.killTweensOf(document.body);

        const tl = gsap.timeline()
        tl
            // .to(document.body, {duration: 0.2, backgroundColor: '#211c25'})
            .to(DOM.filler.current, {
                duration: 0.5,
                ease: 'Power3.easeOut',
                startAt: {y: '75%'},
                y: '0%'
            }, 0)
            .to(DOM.textInner.current, {
                duration: 0.4,
                ease: 'Expo.easeOut',
                scale: 0.8
            }, 0);
    }, [DOM.el, DOM.filler, DOM.textInner, renderedStyles])

    const leave = useCallback(() => {
        // Dispatch an leave event
        eventBus.dispatch('leave')
        setHover(false)

        DOM?.el?.current?.classList?.remove('button--hover');

        setRenderedStyles((prevState) => ({
            ...prevState,
            scale: {
                ...prevState.scale,
                current: 1
            }
        }))
        
        gsap.killTweensOf(document.body);
        gsap.killTweensOf(DOM.filler);

        const tl = gsap.timeline()
        // console.log(tl)
        tl
            // .to(document.body, {duration: 0.2, backgroundColor: bodyColor})
            .to(DOM.filler.current,{
                duration: 0.4,
                ease: 'Power3.easeOut',
                y: '-75%'
            }, 0)
            .to(DOM.textInner.current, {
                duration: 0.4,
                ease: 'Expo.easeOut',
                scale: 1
            }, 0);
    }, [DOM?.el, DOM.filler, DOM.textInner, bodyColor, renderedStyles])


    const render = () => {
        // console.log("render")
        // calculate the distance from the mouse to the center of the button
        const distanceMouseButton = distance(mousepos.x+window.scrollX, mousepos.y+window.scrollY, rect?.left + rect?.width/2, rect?.top + rect?.height/2);
        // new values for the translations and scale
        let x = 0;
        let y = 0;

        // console.log(mousepos, distanceMouseButton, distanceToTrigger)
        if ( distanceMouseButton < distanceToTrigger ) {
            if ( !hover ) {
                // console.log("Entering")
                enter();
            }
            x = (mousepos.x + window.scrollX - (rect?.left + rect?.width/4))*.3;
            y = (mousepos.y + window.scrollY - (rect?.top + rect?.height/4))*.3;
        }
        else if ( hover ) {
            // console.log("Leaving")
            leave();
        }

        setRenderedStyles((prevState) => ({
            ...prevState,
            tx: {
                ...prevState.tx,
                current: x
            },
            ty: {
                ...prevState.ty,
                current: y
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
        
        // Do a non-null check before assignment
        if(DOM.el.current){
            DOM.el.current.style.transform = `translate3d(${renderedStyles['tx'].previous}px, ${renderedStyles['ty'].previous}px, 0) scale(${renderedStyles['scale'].previous})`;
            // DOM.el.current.style.transform = `scale(${renderedStyles['scale'].previous})`;
        }

        // requestAnimationFrame(() => render());
    }

    
    useEffect(() => { // Initialise eventlisteners
        setWinSize(calcWinsize())
        window.addEventListener('resize', () => setWinSize(calcWinsize()))
        initEvents()
        window.addEventListener('mousemove', ev => setMousePos(getMousePos(ev)));
    }, [])

    useEffect(() => { // Everytime mousepos changes re-run calculations
        calculateSizePosition() 
        requestAnimationFrame(() => render())
    }, [mousepos])

    
    return (
        <button className={classnames("circular", {active: isMenuOpened})} ref={DOM.wrapperEl} onClick={handleMenuOpen}>
            <>
                <span style={{opacity: isMenuOpened ? 0 : 1}}>menu</span>
                <span className="menu-box" ref={DOM.el}>
                    <span></span>
                    <span></span>
                </span>
            </>
        </button>
    )
}