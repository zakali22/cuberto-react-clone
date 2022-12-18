import React from "react"
import {Header} from "../../sections/Header"
import {Text} from "../../components/Text"
import {FeaturedList} from "../../sections/Featured"
import { useSlideIn } from "lib/hooks/useSlideIn"


export const Landing = () => {
    const slideIn = useSlideIn()

    return (
        <>
            <Header slideIn />
            <section>
                <Text slideIn paragraph="Leading digital agency with solid design and development expertise. We build readymade websites, mobile applications, and elaborate online business services." />
            </section>
            <FeaturedList slideIn />
        </>    
    )
}