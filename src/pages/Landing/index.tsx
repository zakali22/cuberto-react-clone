import React from "react"
import {Header} from "../../sections/Header"
import {Text} from "../../components/Text"
import {FeaturedList} from "../../sections/Featured"

export const Landing = () => {
    return (
        <>
            <Header />
            <Text paragraph="Leading digital agency with solid design and development expertise. We build readymade websites, mobile applications, and elaborate online business services." />
            <FeaturedList />
        </>    
    )
}