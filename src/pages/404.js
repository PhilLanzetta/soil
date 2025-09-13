import * as React from "react"
import Seo from "../components/seo"
import * as styles from "../components/notFound.module.css"
import { Link } from "gatsby"

const NotFoundPage = () => (
  <>
    <div className={styles.notFoundContainer}>
      <h1>404: Not Found</h1>
      <p>This URL is no longer active.</p>
      <Link to="/" className={styles.returnBtn}>Return Home</Link>
    </div>
  </>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
