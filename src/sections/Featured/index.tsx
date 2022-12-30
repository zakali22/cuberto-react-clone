import {useContext, createRef, useEffect, useState, useRef} from "react"
import featuredProjects from "../../data/featuredProjects.json"
import {FeaturedItem} from "./FeaturedItem"
import { Container } from "components/Container"
import {gsap} from "gsap"
import {CursorContext} from "../../lib/context/cursorContext"
import {ScrollTrigger} from "gsap/ScrollTrigger"
import "./featured.scss"
import { Button } from "components/MagneticButton"

// gsap.registerPlugin(ScrollTrigger)

export const FeaturedList = () => {
    const {cursor} = useContext(CursorContext)
    const [hasLoaded, setHasLoaded] = useState(false)
    const featuredWrapperRef = useRef<HTMLElement>(null)
    const refArr = useRef([])
    refArr.current = featuredProjects.data.map((item, index) => refArr.current[index] ?? createRef())
    


    useEffect(() => {
        document.body.style.backgroundColor = '#fff'
        setHasLoaded(true)
    }, [])


    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger)
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
                    // console.log("Leaving wrapper")
                    gsap.to(document.body, {
                        backgroundColor: '#fff',
                        duration: 1
                    })
                },
                onLeaveBack: ({progress, direction, isActive}) => {
                    // console.log("Leaving wrapper")
                    gsap.to(document.body, {
                        backgroundColor: '#fff',
                        duration: 1
                    })
                }
            })
        }
        
    }, [hasLoaded])


    function makeDistortion(index: number){
        const tl = gsap.timeline();
        const svg = document.querySelectorAll('#svg-distortion')
        const featuredImgEls = document.querySelectorAll('.featured-item__img')

        featuredImgEls.forEach((el, i) => {
            el.classList.toggle('-active', index === i)
        })

        svg.forEach((svgFilter, svgIdx) => {
            if(index === svgIdx){
                const svgFilterTurbulence= svgFilter.querySelector('feTurbulence');
                const svgFilterDisplacementMap = svgFilter.querySelector('feDisplacementMap');
    
                // Kill all previous tweens of displacement map
                gsap.killTweensOf(svgFilterDisplacementMap);
                    
                // Set random seed of turbulence
                tl.set(svgFilterTurbulence, {
                    attr: {seed: gsap.utils.random(2, 150)},
                }, 0);
                
                // Scale displacement map to random value
                tl.to(svgFilterDisplacementMap, {
                    attr: {scale: gsap.utils.random(80, 120)},
                    duration: 0.2,
                }, 0);
    
                // Scale back displacement map to initial value
                tl.to(svgFilterDisplacementMap, {
                    attr: {scale: 1},
                    duration: 1.2,
                    ease: "expo.out"
                }, 0.2);
            }
            
        })
        
    };

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
                            <>
                            <FeaturedItem data={item} ref={refArr.current[index]} index={index} makeDistortion={makeDistortion}/>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 463 463" style={{position:"absolute", top:"-1px",left:"-1px",height:0,width:0}} id="svg-distortion">
                                <defs>
                                    <filter id={`svg-distortion-filter-${index}`}>
                                        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.003" stitchTiles="noStitch" numOctaves="1" seed="2" result="warp"></feTurbulence>
                                        <feDisplacementMap xChannelSelector="R" yChannelSelector="G" scale="1" in="SourceGraphic" in2="warp"></feDisplacementMap>
                                    </filter>
                                </defs>
                            </svg>
                            </>
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