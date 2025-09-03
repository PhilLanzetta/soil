/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import React, { useState, useEffect } from "react"
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
  const [pressPopUp, setPressPopUp] = useState(false)
  const [email, setEmail] = useState("")
  const [inquireState, setInquireState] = useState({})

  const handleChange = e => {
    setInquireState({ ...inquireState, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    let textarea = document.getElementById("message")
    let charCount = document.getElementById("charCount")
    const maxNumOfChars = 300
    const inquireSuccess = document.getElementById("inquire-success")
    const inquireError = document.getElementById("inquire-error")
    const inquireClose = document.getElementById("inquire-close")

    inquireSuccess && (inquireSuccess.style.display = "none")
    inquireError && (inquireError.style.display = "none")
    inquireClose && (inquireClose.style.display = "none")

    textarea?.addEventListener("keyup", function () {
      let textEntered = textarea.value
      let counter = maxNumOfChars - textEntered.length
      charCount.textContent = counter + " characters remaining"
    })
  }, [pressPopUp])

  const handleSubmit = e => {
    e.preventDefault()
    const form = e.target
    const inquireSuccess = document.getElementById("inquire-success")
    const inquireError = document.getElementById("inquire-error")
    const inquireSubmit = document.getElementById("inquire-submit")
    const inquireClose = document.getElementById("inquire-close")
    const innerForm = document.getElementById("inner-form")

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...inquireState,
      }),
    })
      .then(() => {
        inquireSuccess.style.display = "flex"
        innerForm.style.visibility = "hidden"
        inquireClose.style.display = "flex"
        inquireSubmit.style.display = "none"
        setTimeout(() => {
          setPressPopUp(false)
        }, 3000)
        form.reset()
      })
      .catch(error => {
        inquireError.style.display = "block"
        inquireError.innerHTML = error
      })
  }

  const postUrl = process.env.GATSBY_MAILCHIMP_URL

  const handleEmailChange = e => {
    setEmail(e.target.value)
  }

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
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
          <Footer
            location={location}
            setPopUp={setPopUp}
            setPressPopUp={setPressPopUp}
          />
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
        {pressPopUp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.popUp}
          >
            <div className={styles.popUpContainer}>
              <div className={styles.popUpInner}>
                <h2 className={styles.popUpHeading}>Contact Us</h2>
                <p>
                  Please share your message for{" "}
                  <a href="mailto:press@solidobjectives.com">
                    press@solidobjectives.com
                  </a>{" "}
                  below.
                </p>
                <div className={styles.closeContainer}>
                  <button
                    className={styles.closeButton}
                    onClick={() => setPressPopUp(false)}
                    aria-label="close"
                  >
                    <span></span>
                    <span></span>
                  </button>
                </div>
                <form
                  name="press-form"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className={styles.inquireForm}
                >
                  <div id="inquire-success" className={styles.submitMessage}>
                    <h2 className={styles.popUpHeadline}>Thank you</h2>
                    <p>We've received your message.</p>
                  </div>
                  <div
                    id="inquire-error"
                    className={styles.submitMessage}
                  ></div>
                  <input type="hidden" name="form-name" value="inquire" />
                  <p hidden>
                    <label>
                      Don’t fill this out if you’re human:{" "}
                      <input name="bot-field" onChange={handleChange} />
                    </label>
                  </p>
                  <div id="inner-form" className={styles.innerForm}>
                    <input
                      type="text"
                      name="first-name"
                      onChange={handleChange}
                      className={styles.inquireInput}
                      placeholder="First Name"
                    />
                    <input
                      type="text"
                      name="last-name"
                      onChange={handleChange}
                      className={styles.inquireInput}
                      placeholder="Last Name"
                    />
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                      className={styles.inquireEmailInput}
                      placeholder="Email Address"
                    />
                    <textarea
                      name="message"
                      id="message"
                      rows="8"
                      maxLength="300"
                      placeholder="Message"
                      onChange={handleChange}
                      className={styles.inquireArea}
                    ></textarea>
                    <div id="charCount" className={styles.characterCount}>
                      300 characters remaining
                    </div>
                  </div>
                  <button
                    type="submit"
                    className={styles.submit}
                    id="inquire-submit"
                  >
                    Submit
                  </button>
                  <button
                    className={styles.submit}
                    onClick={() => setPressPopUp(false)}
                    id="inquire-close"
                  >
                    Close
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Layout
