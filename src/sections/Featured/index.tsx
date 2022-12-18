import {useContext, createRef, useEffect, useState, useRef} from "react"
import featuredProjects from "../../data/featuredProjects.json"
import {FeaturedItem} from "./FeaturedItem"
import { Container } from "components/Container"
import {gsap} from "gsap"
import {CursorContext} from "../../lib/context/cursorContext"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import "./featured.scss"
import { Button } from "components/MagneticButton"

type Props = {
    slideIn?: boolean
}

export const FeaturedList = ({slideIn}: Props) => {
    const {cursor} = useContext(CursorContext)
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

                            featuredItem.current.querySelector('.featured-item__img')?.addEventListener('mouseenter', function(){
                                cursor.current.setText("View case")
                            })

                            featuredItem.current.querySelector('.featured-item__img')?.addEventListener('mouseleave', function(){
                                cursor.current.removeText()
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
        <section className={`${slideIn ? 'slide-in' : ''} featured`} ref={featuredWrapperRef}>
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
                            <FeaturedItem slideIn data={item} ref={refArr.current[index]} />
                        ))
                    }
                </div>
                <div className="featured-more more-wrapper">
                    <Button text="View all projects" customColor="" type="ripple" isMagnetic/>
                </div>
            </Container>
        </section>
    )
}