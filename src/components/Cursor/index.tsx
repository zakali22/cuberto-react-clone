import React, {useEffect, useRef, useState, useCallback} from "react"
import MouseFollower from "mouse-follower";
import gsap from "gsap";
import "./MouseFollowerStyling.scss"

import branding from "../../videos/brandingHeader.mp4"
import apps from "../../videos/appsHeader.mp4"
import websites from "../../videos/websitesHeader.mp4"

MouseFollower.registerGSAP(gsap);

export const Cursor = () => {
    const [renderVideo, setRenderVideo] = useState({render: false, src: branding})
    const [pos, setPos] = useState({x: 0, y: 0})
    const [hoverAreaEntered, setHoverAreaEntered] = useState(false)
    const cursor = useRef<any>(null)

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

    useEffect(() => {
        if(!cursor.current){ // Make sure to initialise once
            cursor.current = new MouseFollower({
                container: document.body,
                speed: 0.3
            });
        }
    }, [])

    useEffect(() => {
        const headerItemEl = document.querySelectorAll('#headerItem')
        headerItemEl.forEach(el => {
            el.addEventListener('mouseenter', function(e){
                let hoverId = ((e.target as HTMLElement).closest('#headerItem') as HTMLElement).dataset.hoverId
                type ObjectKey = keyof typeof videoSrc
                cursor.current.setVideo(videoSrc[hoverId as ObjectKey]);

                el?.querySelector('a .mask > span')?.addEventListener('mouseenter', function(e){
                    cursor.current.addState('-media-blend -media-lg');
                })
            })

            el.addEventListener('mouseleave', function(e){
                cursor.current.removeVideo();

                el?.querySelector('a .mask > span')?.addEventListener('mouseleave', function(e){
                    cursor.current.removeState('-media-blend -media-lg');
                })
            })
        })
    }, [])

    return (
        <div className="mf-cursor" ref={DOM.el} style={{display: 'none'}}></div> // Hide this element to prevent duplicate initialisation
    )
}