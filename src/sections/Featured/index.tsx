import featuredProjects from "../../data/featuredProjects.json"
import {FeaturedItem} from "./FeaturedItem"
import { Container } from "components/Container"
import "./featured.scss"

export const FeaturedList = () => {

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
                        featuredProjects.data.map((item) => (
                            <FeaturedItem data={item}/>
                        ))
                    }
                </div>
            </Container>
        </section>
    )
}