import {createRef, useEffect, useRef} from "react"
import featuredProjects from "../../data/featuredProjects.json"
import {FeaturedItem} from "./FeaturedItem"
import { Container } from "components/Container"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import "./featured.scss"

export const FeaturedList = () => {
    const refArr = useRef([])
    refArr.current = featuredProjects.data.map((item, index) => refArr.current[index] ?? createRef())
    gsap.registerPlugin(ScrollTrigger)

    useEffect(() => {
        refArr.current.forEach((featuredItem: any) => {
            if(featuredItem.current){
                console.log(featuredItem.current)
                ScrollTrigger.create({
                    trigger: featuredItem.current,
                    start: "top center",
                    end: "bottom top", 
                    // scrub: true,
                    onEnter: ({progress, direction, isActive}) => {
                        console.log("Entered")
                        console.log(isActive)
                    },
                    markers: true
                })
            }
        })
    }, [])

    return (
        <section className="featured">
            <Container direction="column" fullwidth={true}>
                <div className="featured-title">
                    <h2>
                        Featured
                        <span>Projects</span>
                    </h2>
                </div>
                <div className="featured-list">
                    {
                        featuredProjects.data.map((item, index) => (
                            <FeaturedItem data={item} ref={refArr.current[index]} />
                        ))
                    }
                </div>
            </Container>
        </section>
    )
}