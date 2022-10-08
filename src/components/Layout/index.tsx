import React from "react"
import {Navbar} from "@components/Nav"
import {Cursor} from "@components/Cursor"

interface Props {
    children: React.ReactElement
}

export const Layout: React.FC<Props> = ({children}) => {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Cursor />
            <footer>
                <h1>Footer</h1>
            </footer>
        </>
    )
}