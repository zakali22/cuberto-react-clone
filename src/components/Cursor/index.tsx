import React, {useEffect, useLayoutEffect, useRef, useState, useCallback} from "react"
import { gsap } from 'gsap';
import { lerp, getMousePos, getAngle, getScale } from '../../lib/utils';
import eventBus from "../../lib/EventBus"
// import {useInstance, useTicker} from "../../lib/hooks"
import styles from "./Cursor.module.scss"

import brandingHeader from "../../videos/brandingHeader.mp4"
import appsHeader from "../../videos/appsHeader.mp4"
import websitesHeader from "../../videos/websitesHeader.mp4"

export const Cursor = () => {
    const [renderVideo, setRenderVideo] = useState({render: false, src: ""})
    const [hoverAreaEntered, setHoverAreaEntered] = useState(false)

    let DOM = {
        el: useRef<HTMLElement|any>(null),
        elInner: useRef<HTMLElement|any>(null),
        videoEl: useRef<HTMLElement|any>(null),
        videoElSource: useRef<HTMLElement|any>(null)
    }

    function useTicker(callback: any, paused?: any) {
        useLayoutEffect(() => {
            if (!paused && callback) {
            gsap.ticker.add(callback);
            }
            return () => {
            gsap.ticker.remove(callback);
            };
        }, [callback, paused]);
    }
        
    const EMPTY = {};
        function useInstance(value = {}) {
        const ref = useRef(EMPTY);
        if (ref.current === EMPTY) {
            ref.current = typeof value === "function" ? value() : value;
        }
        return ref.current;
    }
    
    // Function for Mouse Move Scale Change
    function getScale(diffX: any, diffY: any) {
        const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
        return Math.min(distance / 800, 0.25);
    }
    
    // Function For Mouse Movement Angle in Degrees
    function getAngle(diffX: any, diffY: any) {
        return (Math.atan2(diffY, diffX) * 180) / Math.PI;
    }

    interface ISet {
        x?: Function,
        y?: Function,
        xInner?: Function,
        yInner?: Function,
        r?: Function,
        sx?: Function,
        sy?: Function,
        rt?: Function,
    }

    interface IPos {
        x?: number,
        y?: number
    }

    // Save pos and velocity Objects
    const pos: IPos = useInstance(() => ({ x: 0, y: 0 }));
    const vel: IPos = useInstance(() => ({ x: 0, y: 0 }));
    const set: ISet = useInstance()

    useLayoutEffect(() => {
        set.x = gsap.quickSetter(DOM.el.current, "x", "px");
        set.y = gsap.quickSetter(DOM.el.current, "y", "px")
        set.sx = gsap.quickSetter(DOM.elInner.current, "scaleX")
        set.sy = gsap.quickSetter(DOM.elInner.current, "scaleY")
    }, [])

    useEffect(() => {
        eventBus.on('headerHoverEnter', headerHoverEnter)
        eventBus.on('headerHoverLeave', headerHoverLeave)   
    }, [hoverAreaEntered])

  
    // Start Animation loop
    const loop = useCallback(() => {
      // Calculate angle and scale based on velocity
      var scale = getScale(vel.x, vel.y);
  
      set.x?.(pos.x);
      set.y?.(pos.y);
      set.sx?.(1 + scale);
      set.sy?.(1 - scale);
    }, []);
    
    // Run on Mouse Move
    useLayoutEffect(() => {
      
      // Caluclate Everything Function
      const setFromEvent = (e: any) => {
        // Mouse X and Y
        const x = e.clientX;
        const y = e.clientY;
        const mx = e.movementX;
        const my = e.movementY;
        const speed = 0.5

        eventBus.on('enter', enter)
        eventBus.on('leave', leave)

  
        // Animate Pos Object and calculate Vel Object Velocity
        gsap.to(pos, {
          x: x,
          y: y,
          duration: speed,
          onUpdate: () => {
            if(pos.x && pos.y){
                vel.x = (x - pos.x)/2;
                vel.y = (y - pos.y)/2;
            }
          }
        });
        
        loop();
      };    
          
      window.addEventListener("mousemove", setFromEvent);
  
      return () => {
        window.removeEventListener("mousemove", setFromEvent);
      };
    }, []);
    

    useTicker(loop);

    function enter(e: any){
        console.log("Entered mg button")
        gsap.to(DOM.el.current, {scale: 0, duration: 1, ease: "Power0.inOut"})
    }

    
    function leave(){
        console.log("Left mg button")
        gsap.to(DOM.el.current, {scale: 1, duration: 1, ease: "Power0.inOut"})
    }


    function headerHoverEnter(e: any){

        
        if(renderVideo.src !== e){
            setRenderVideo({
                render: true,
                src: e
            })
        }

        setHoverAreaEntered(true) 
        if(hoverAreaEntered){
            // console.log("Entered the hover area")
            gsap.to(DOM.elInner.current, {width: "300px", height: "300px", duration: 1, ease: "Power2.inOut"})
            setHoverAreaEntered(false) 
        }
    }
    
    function headerHoverLeave(e: any){

        setRenderVideo({
            render: false,
            src: ""
        })
        
        if(!hoverAreaEntered){
            // console.log("Left the hover area")
            gsap.to(DOM.elInner.current, {width: "10px", height: "10px", duration: 5, ease: "Power0.inOut"})
        }

    }

    return (
        <div className={styles["cursor"]} ref={DOM.el}>
            <div className={styles["cursor__inner"]} ref={DOM.elInner}>
                <div className={styles["cursor-media"]}>
                    {renderVideo.render && renderVideo.src && 
                        <video preload={'auto'} muted={true} loop ref={DOM.videoEl} autoPlay>
                            <source src={brandingHeader} ref={DOM.videoElSource} type="video/mp4" />
                        </video>
                    }
                </div>
            </div>
            
        </div>
    )
}