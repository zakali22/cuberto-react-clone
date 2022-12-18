import React from "react"
import { Link } from "react-router-dom"
import {FeaturedProject} from "../../data/types"
import {useFadeIn} from "../../lib/hooks/useFadeIn"

type FeaturedItemProps = {
    data: FeaturedProject,
    slideIn?: boolean
}

export const FeaturedItem = React.forwardRef<HTMLDivElement, FeaturedItemProps>(({data, slideIn}: FeaturedItemProps, ref) => {    
    const fadeIn = useFadeIn()

    return (
        <div className="featured-item" ref={ref} data-color={data.color} data-cursor={data.project.toLowerCase()}>
            <div className="featured-item__left">
                <div className={`${slideIn ? 'slide-in' : ''} featured-item__content`}>
                    <div className="featured-item__heading">
                        <h3>{data.project}</h3>
                    </div>
                    <div className="featured-item__desc">
                        <p>{data.title.line1}</p>
                        <p>{data.title.line2}</p>
                    </div>
                    <div className="featured-item__tags">
                        <p>{data.tags.join(", ")}</p>
                    </div>
                </div>
            </div>
            <div className="featured-item__right fade-in">
                <Link to={data.link} className="featured-item__img">
                    <picture>
                        <source srcSet={data.imgSrcSet.join(", ")} media="(max-width: 199px)"/>
                        <img src={data.imgSrcSet[0]} srcSet={data.imgSrcSet[1]} alt={data.project}/>
                    </picture>
                </Link>
            </div>
        </div>
    )
})