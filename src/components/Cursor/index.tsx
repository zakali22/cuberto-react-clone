import React, {useEffect, useRef, useContext, useState, useCallback} from "react"
import {CursorContext} from "../../lib/context/cursorContext"

import "./MouseFollowerStyling.scss"
import branding from "../../videos/brandingHeader.mp4"
import apps from "../../videos/appsHeader.mp4"
import websites from "../../videos/websitesHeader.mp4"



export const Cursor = () => {
    const {cursor} = useContext(CursorContext)

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