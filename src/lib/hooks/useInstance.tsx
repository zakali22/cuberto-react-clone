import {useRef} from "react"


const EMPTY_ObJ = {}
export function useInstance(value = {}) {
    const ref = useRef(EMPTY_ObJ);
    if (ref.current === EMPTY_ObJ) {
        ref.current = typeof value === "function" ? value() : value;
    }
    return ref.current;
}
