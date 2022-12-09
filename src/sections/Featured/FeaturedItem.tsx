import React from "react"
import { Link } from "react-router-dom"
import {FeaturedProject} from "../../data/types"

type FeaturedItemProps = {
    data: FeaturedProject
}

export const FeaturedItem = React.forwardRef<HTMLDivElement, FeaturedItemProps>(({data}: FeaturedItemProps, ref) => {    
    return (
        <div className="featured-item" ref={ref}>
            <div className="featured-item__left">
                <div className="featured-item__content">
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
            <div className="featured-item__right">
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