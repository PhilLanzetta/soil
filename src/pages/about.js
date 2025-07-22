import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from '../components/about.module.css'

const About = () => {
  return (
    <div className="margined-section">
      <h1 className={styles.title}>About</h1>
    </div>
  )
}

export default About
