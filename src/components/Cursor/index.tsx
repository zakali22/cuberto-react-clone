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
        // set.r = gsap.quickSetter(DOM.elInner.current, "rotate", "deg")
        set.sx = gsap.quickSetter(DOM.elInner.current, "scaleX")
        set.sy = gsap.quickSetter(DOM.elInner.current, "scaleY")
        // set.rt = gsap.quickSetter(DOM.elInner.current, "rotate", "deg");
    }, [])

    useEffect(() => {
        eventBus.on('headerHoverEnter', headerHoverEnter)
        eventBus.on('headerHoverLeave', headerHoverLeave)   
    }, [hoverAreaEntered])

  
    // Start Animation loop
    const loop = useCallback(() => {
      // Calculate angle and scale based on velocity
      var rotation = getAngle(vel.x, vel.y);
      var scale = getScale(vel.x, vel.y);
  
      set.x?.(pos.x);
      set.y?.(pos.y);
    //   set.r?.(rotation);
      set.sx?.(1 + scale);
      set.sy?.(1 - scale);
    //   set.rt?.(-rotation);
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

        // eventBus.on('enter', enter)
        // eventBus.on('leave', leave)

  
        // Animate Pos Object and calculate Vel Object Velocity
        gsap.to(pos, {
          x: x,
          y: y,
          duration: speed,
          onUpdate: () => {
            if(pos.x && pos.y){
                vel.x = x - pos.x;
                vel.y = y - pos.y;
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

    // function enter(e: any){
    //     setRenderedStyles((prevState) => ({
    //         ...prevState, 
    //         scaleX: {
    //             ...prevState.scaleX,
    //             current: 4
    //         },
    //         scaleY: {
    //             ...prevState.scaleY,
    //             current: 4
    //         },
    //         opacity: {
    //             ...prevState.opacity,
    //             current: 0
    //         }
    //     }))
    // }

    
    // function leave(){
    //     setRenderedStyles((prevState) => ({
    //         ...prevState, 
    //         scaleX: {
    //             ...prevState.scaleX,
    //             current: 1
    //         },
    //         scaleY: {
    //             ...prevState.scaleY,
    //             current: 1
    //         },
    //         opacity: {
    //             ...prevState.opacity,
    //             current: 1
    //         }
    //     }))
    // }


    function headerHoverEnter(e: any){

        
        if(renderVideo.src !== e){
            setRenderVideo({
                render: true,
                src: e
            })
        }

        setHoverAreaEntered(true) 
        if(hoverAreaEntered){
            console.log("Entered the hover area")
            gsap.to(DOM.elInner.current, {width: "300px", height: "300px", duration: 1, ease: "Power2.inOut"})
            // DOM.el.current.style.width = '0px'
            // DOM.el.current.style.height = '0px'

            // DOM.elInner.current.style.display = 'block'
            // DOM.elInner.current.style.width = '300px'
            // DOM.elInner.current.style.height = '300px'
            setHoverAreaEntered(false) 
        }
        

        // setRenderedStyles((prevState) => ({
        //     ...prevState, 
        //     scaleX: {
        //         ...prevState.scaleX,
        //         current: 6
        //     },
        //     scaleY: {
        //         ...prevState.scaleY,
        //         current: 6
        //     }
        // }))
    }
    
    function headerHoverLeave(e: any){

        setRenderVideo({
            render: false,
            src: ""
        })
        
        // gsap.to(DOM.elInner.current, {width: "20px", height: "20px", duration: 7, ease: "Power0.inOut"})
        
        if(!hoverAreaEntered){
            console.log("Left the hover area")
            gsap.to(DOM.elInner.current, {width: "10px", height: "10px", duration: 5, ease: "Power0.inOut"})
            // DOM.elInner.current.style.width = '0px'
            // DOM.elInner.current.style.height = '0px'

            // DOM.el.current.style.width = '10px'
            // DOM.el.current.style.height = '10px'
            // DOM.elInner.current.style.scale = 'none'

            // DOM.elInner.current.style.width = '0px'
            // DOM.elInner.current.style.height = '0px'

            // setHoverAreaEntered(true)
        }


        // DOM.elInner.current.style.background = '#000'
        // setRenderedStyles((prevState) => ({
        //     ...prevState, 
        //     scaleX: {
        //         ...prevState.scaleX,
        //         current: 0.2
        //     },
        //     scaleY: {
        //         ...prevState.scaleY,
        //         current: 0.2
        //     }
        // }))
    }

    return (
        <div className={styles["cursor"]} ref={DOM.el}>
            {/* <svg className={styles["cursor"]} width="25" height="25" viewBox="0 0 25 25" ref={DOM.el}>
                <circle className={styles["cursor__inner"]} cx="12.5" cy="12.5" r="6.25" />
            </svg> */}
            <div className={styles["cursor__inner"]} ref={DOM.elInner}>
                <div className={styles["cursor-media"]}>
                    {/* <img src="/images/icons/svgsprites.svg" alt="Logo" /> */}

                    {/* {renderVideo.render && renderVideo.src === 'websites' && 
                        <video preload={'auto'} muted={true} loop ref={DOM.videoEl} autoPlay>
                            <source src={websitesHeader} ref={DOM.videoElSource} type="video/mp4" />
                        </video>
                    }

                    {renderVideo.render && renderVideo.src === 'apps' && 
                        <video preload={'auto'} muted={true} loop ref={DOM.videoEl} autoPlay>
                            <source src={appsHeader} ref={DOM.videoElSource} type="video/mp4" />
                        </video>
                    }

                    {renderVideo.render && renderVideo.src === 'branding' && 
                        <video preload={'auto'} muted={true} loop ref={DOM.videoEl} autoPlay>
                            <source src={brandingHeader} ref={DOM.videoElSource} type="video/mp4" />
                        </video>
                    } */}

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