import React from "react"
import { Link } from "react-router-dom"
import {FeaturedProject} from "../../data/types"

type FeaturedItemProps = {
    data: FeaturedProject,
    index: number,
    makeDistortion: (index: number) => void
}

export const FeaturedItem = React.forwardRef<HTMLDivElement, FeaturedItemProps>(({data, index, makeDistortion}: FeaturedItemProps, ref) => {    
    return (
        <div className="featured-item" ref={ref} data-color={data.color} data-cursor={data.project.toLowerCase()}>
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
            <div className="featured-item__right" onMouseEnter={() => makeDistortion(index)}>
                <Link to={data.link} className="featured-item__img" style={{filter:`url(#svg-distortion-filter-${index})`}} data-index={index}>
                    <picture>
                        <source srcSet={data.imgSrcSet.join(", ")} media="(max-width: 199px)"/>
                        <img src={data.imgSrcSet[0]} srcSet={data.imgSrcSet[1]} alt={data.project}/>
                    </picture>
                </Link>
            </div>
        </div>
    )
})