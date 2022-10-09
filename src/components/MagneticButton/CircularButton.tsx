import React from "react"

export const CircularButton = React.forwardRef<any>((props, ref) => {
    console.log(props)
    console.log(ref)
    return (
        <button className="circular">
            <>
                <span>menu</span>
                <span className="menu-box" ref={ref}>
                    <span></span>
                    <span></span>
                </span>
            </>
        </button>
    )
})