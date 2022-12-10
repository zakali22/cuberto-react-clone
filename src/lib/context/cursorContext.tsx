import {useEffect, useRef, useState, createContext} from "react"
import gsap from "gsap";
import MouseFollower from "mouse-follower";

MouseFollower.registerGSAP(gsap);

interface Props {
    children: React.ReactElement
}

export const CursorContext = createContext<any | null>(null);

export const CursorProvider: React.FC<Props> = ({children}) => {
    const cursor = useRef<any>(null)

    useEffect(() => {
        if(!cursor.current){ // Make sure to initialise once
            cursor.current = new MouseFollower({
                container: document.body,
                speed: 0.3,
                stateDetection: {
                    // '-mf-cursor-md': '.featured-item__img'
                }
            });
        }
    }, [])

    return <CursorContext.Provider value={{cursor}}>{children}</CursorContext.Provider>;
};

export default CursorProvider;