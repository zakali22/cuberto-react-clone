import {createRef, useEffect, useState, useRef} from "react"
import featuredProjects from "../../data/featuredProjects.json"
import {FeaturedItem} from "./FeaturedItem"
import { Container } from "components/Container"
import {gsap} from "gsap"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import "./featured.scss"

export const FeaturedList = () => {
    const [hasLoaded, setHasLoaded] = useState(false)
    const featuredWrapperRef = useRef<HTMLElement>(null)
    const refArr = useRef([])
    refArr.current = featuredProjects.data.map((item, index) => refArr.current[index] ?? createRef())
    
    gsap.registerPlugin(ScrollTrigger)

    useEffect(() => {
        document.body.style.backgroundColor = '#fff'
        setHasLoaded(true)
    }, [])


    useEffect(() => {
        if(hasLoaded){
            refArr.current.forEach((featuredItem: any) => {
                if(featuredItem.current){
                    ScrollTrigger.create({
                        trigger: featuredItem.current,
                        start: "top center",
                        end: "bottom center",
                        onEnter: ({progress, direction, isActive}) => {
                            gsap.to(document.body, {
                                backgroundColor: featuredItem.current.dataset.color,
                                duration: 1
                            })
                        },
                        onEnterBack: ({progress, direction, isActive}) => {
                            gsap.to(document.body, {
                                backgroundColor: featuredItem.current.dataset.color,
                                duration: 1
                            })
                        }
                    })
                }
            })
    
    
            ScrollTrigger.create({
                trigger: featuredWrapperRef.current,
                start: "top center",
                end: "bottom center",
                onLeave: ({progress, direction, isActive}) => {
                    console.log("Leaving wrapper")
                    gsap.to(document.body, {
                        backgroundColor: '#fff',
                        duration: 1
                    })
                },
                onLeaveBack: ({progress, direction, isActive}) => {
                    console.log("Leaving wrapper")
                    gsap.to(document.body, {
                        backgroundColor: '#fff',
                        duration: 1
                    })
                }
            })
        }
        
    }, [hasLoaded])

    return (
        <section className="featured" ref={featuredWrapperRef}>
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