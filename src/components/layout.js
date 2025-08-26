/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useState } from "react"
import Footer from "./footer"
import Header from "./header"
import * as styles from "./layout.module.css"
import "./global.css"
import { motion, AnimatePresence } from "motion/react"
import MailchimpSubscribe from "react-mailchimp-subscribe"

const Layout = ({ children, location }) => {
  const container = {
    out: { opacity: 0, transition: { duration: 0.5 } },
    in: { opacity: 1, transition: { duration: 1 } },
    start: { opacity: 0 },
  }
  const [popUp, setPopUp] = useState(false)
  const [email, setEmail] = useState("")

  const postUrl = process.env.GATSBY_MAILCHIMP_URL

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  return (
    <>
      <Header location={location} />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={container}
          initial="start"
          animate="in"
          exit="out"
        >
          {children}
          <Footer location={location} setPopUp={setPopUp} />
        </motion.main>
      </AnimatePresence>
      <AnimatePresence>
        {popUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.popUp}
          >
            <div className={styles.popUpContainer}>
              <div className={styles.popUpInner}>
                <h2 className={styles.popUpHeading}>Join our Newsletter</h2>
                <p>
                  Learn about project updates, publications, news, and more.
                </p>
                <div className={styles.closeContainer}>
                  <button
                    className={styles.closeButton}
                    onClick={() => setPopUp(false)}
                    aria-label="close"
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
                <MailchimpSubscribe
                  url={postUrl}
                  render={({ subscribe, status, message }) => {
                    if (status === "success") {
                      setTimeout(() => {
                        setPopUp(false)
                      }, 2000)
                    }
                    return (
                      <div>
                        {status !== "success" && (
                          <input
                            type="email"
                            value={email}
                            autoCapitalize="off"
                            onChange={handleEmailChange}
                            placeholder="Email"
                            required
                            className={styles.emailInput}
                          />
                        )}
                        {status === "success" && (
                          <div className={styles.emailInput}>Thank you</div>
                        )}
                        <button
                          onClick={() =>
                            subscribe({
                              EMAIL: email,
                            })
                          }
                          className={styles.submit}
                          disabled={status === "success" ? true : false}
                        >
                          Subscribe
                        </button>
                        <div className={styles.extraPadding}></div>
                        {status === "error" && (
                          <div
                            dangerouslySetInnerHTML={{ __html: message }}
                            className={styles.errorMessage}
                          />
                        )}
                      </div>
                    )
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Layout
