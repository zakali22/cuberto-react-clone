import {useLayoutEffect} from "react"
import {gsap} from "gsap"

export function useTicker(callback: any, paused?: any) {
    useLayoutEffect(() => {
        if (!paused && callback) {
        gsap.ticker.add(callback);
        }
        return () => {
        gsap.ticker.remove(callback);
        };
    }, [callback, paused]);
}