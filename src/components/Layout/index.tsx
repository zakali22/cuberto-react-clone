import React from "react"
import {Navbar} from "@components/Nav"

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
            <footer>
                <h1>Footer</h1>
            </footer>
        </>
    )
}