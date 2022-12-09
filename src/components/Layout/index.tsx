import React, { useState, useEffect, useRef } from "react"
import {Navbar} from "../Nav"
import {Cursor} from "../Cursor"
import Scrollbar from 'smooth-scrollbar';
import {ScrollTrigger} from "gsap/ScrollTrigger"

interface Props {
    children: React.ReactElement
}

export const Layout: React.FC<Props> = ({children}) => {
    const viewportRef = useRef<HTMLElement|any>()
    const [offset, setOffset] = useState<number>()
    let bodyScrollBar = useRef<Scrollbar>()

    useEffect(() => { /** DEBUG: Smoothscroll + custom cursor */
        bodyScrollBar.current = Scrollbar.init(viewportRef.current, {damping: 0.06});
        bodyScrollBar.current.track.xAxis.element.remove();

        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
              if (arguments.length && bodyScrollBar.current) {
                bodyScrollBar!.current!.scrollTop = value;
              }
              return bodyScrollBar?.current?.scrollTop;
            }
        });
        
        bodyScrollBar.current.addListener(ScrollTrigger.update);
        
    }, [])

    useEffect(() => {
        bodyScrollBar?.current?.addListener(({offset}: any) => {
            setOffset(offset.y)
        })
        console.log(offset)
    }, [])

    return (
        <>
            <div id="viewport" ref={viewportRef}> {/** Only the scrollable area should be smooth scrolled - move cursor outside */}
                <Navbar />
                <main>
                    {children}
                </main>
                <footer>
                    <h1>Footer</h1>
                </footer>
            </div>
            <Cursor  />  
        </>
    )
}