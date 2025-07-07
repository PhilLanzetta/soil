import React from "react"
import { graphql } from "gatsby"
import * as styles from "../components/objectives.module.css"
import ProjectTile from "../components/projectTile"

const Objective = ({ data }) => {
  const { title, description, project } = data.contentfulObjective
  return (
    <div className="margined-section">
      <h1 className="extra-padding">{title}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: description.childMarkdownRemark.html,
        }}
        className={styles.description}
      ></div>
      {project && project.length > 0 && (
        <div className={styles.categoryContainer}>
          <h2>Work</h2>
          <div className={styles.itemsContainer}>
            {project.map(item => (
              <ProjectTile key={item.id} project={item}></ProjectTile>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const query = graphql`
  query getSingleObjective($slug: String) {
    contentfulObjective(slug: { eq: $slug }) {
      title
      description {
        childMarkdownRemark {
          html
        }
      }
      project {
        id
        tileMedia {
          image {
            description
            gatsbyImageData
          }
        }
        title
        country
        city
        objectives {
          id
          slug
          title
        }
          slug
      }
    }
  }
`

export default Objective
