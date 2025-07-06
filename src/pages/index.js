import * as React from "react"
import { Link } from "gatsby"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const IndexPage = ({ location }) => <h1>SO-IL</h1>

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
