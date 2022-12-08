
export interface FeaturedProject {
    project: string,
    title: {
        line1: string,
        line2: string
    },
    tags: string[],
    link: string,
    color: string,
    imgSrcSet: string[]
}

export interface FeaturedProjects {
    data: FeaturedProject[]
}