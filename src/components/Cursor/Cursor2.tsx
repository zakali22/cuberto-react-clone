import React, {useEffect, useRef, useState, useCallback} from "react"
// import {useInstance, useTicker} from "../../lib/hooks"
import styles from "./Cursor.module.scss"

import branding from "../../videos/brandingHeader.mp4"
import apps from "../../videos/appsHeader.mp4"
import websites from "../../videos/websitesHeader.mp4"

type Props = {
    windowScrollOffset?: number
}

export const Cursor = ({windowScrollOffset}: Props) => {
    const [renderVideo, setRenderVideo] = useState({render: false, src: branding})
    const [pos, setPos] = useState({x: 0, y: 0})
    const [hoverAreaEntered, setHoverAreaEntered] = useState(false)

    let DOM = {
        el: useRef<HTMLElement|any>(null),
        elInner: useRef<HTMLElement|any>(null),
        videoEl: useRef<HTMLElement|any>(null),
        videoElSource: useRef<HTMLElement|any>(null)
    }

    let videoSrc = {
        branding,
        apps,
        websites
    }

    function animateCursor(interacting: any, position?: {x: any, y: any}){

        // updateTotalMousePos(e);

        requestAnimationFrame(function(){ // To remove the lagging
            DOM.el.current.animate({
                transform: `translate3d(${position?.x}px, ${position?.y}px, 0px) scale(${interacting ? 13 : 1})`
            }, {
                duration: 1500,
                fill: 'forwards'
            })
        })
    }

    const hoverMediaDisplay = useCallback((e: any, interacting: any) => {
        const hoverAreaId = ((e.target as HTMLElement).closest('#headerItem') as HTMLElement).dataset.hoverId
        
        if(interacting){
            console.log(hoverAreaId)
            type ObjectKey = keyof typeof videoSrc
            
            setRenderVideo((prevState) => ({
                ...prevState,
                render: true,
                src: videoSrc[hoverAreaId as ObjectKey]
            }))

            DOM.videoEl.current.load()
            DOM.videoEl.current.play()

        } else {
            setRenderVideo((prevState) => ({
                ...prevState,
                render: false
            }))
        }
    }, [])


    let clientScrollX = useRef(0), clientScrollY = useRef(0);
    let totalScrollX = useRef(0), totalScrollY = useRef(0);
    
    function updateScroll(){
        totalScrollX.current = clientScrollX?.current;
        totalScrollY.current = clientScrollY?.current;
    }

    useEffect(() => {

        window.addEventListener('mousemove', function(e){
            const interactingEl = (e.target as HTMLElement).closest('#headerItem')
            const isInteracting = interactingEl !== null

            clientScrollX.current = (e.pageX - DOM.el.current.offsetWidth / 2); 
            clientScrollY.current = (e.pageY - DOM.el.current.offsetHeight / 2) ;
            updateScroll()
            animateCursor(isInteracting, {x: totalScrollX.current, y: totalScrollY.current})
        })

    }, [])
    


    useEffect(() => {
        const headerItemEl = document.querySelectorAll('#headerItem')
        headerItemEl.forEach(el => {
            el.addEventListener('mouseenter', function(e){
                // hoverMediaDisplay(e, true)
            })

            el.addEventListener('mouseleave', function(e){
                // hoverMediaDisplay(e, false)
            })
        })
    }, [])

    return (
        <div className={styles["cursor"]} ref={DOM.el}>
            <div className={styles["cursor-media"]}>
                {renderVideo.render && 
                    <video preload={'auto'} muted={true} loop ref={DOM.videoEl} autoPlay>
                        <source src={renderVideo.src} ref={DOM.videoElSource} type="video/mp4" />
                    </video>
                }
            </div>
        </div>
    )
}