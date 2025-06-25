import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import * as styles from "./footer.module.css"

const Footer = () => {
  const [nyTime, setNyTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
      hour: "numeric",
      minute: "2-digit",
    })
  )

  const [cetTime, setCetTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Europe/Amsterdam",
      hour: "numeric",
      minute: "2-digit",
    })
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setNyTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          minute: "2-digit",
        })
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [nyTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setCetTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Europe/Amsterdam",
          hour: "numeric",
          minute: "2-digit",
        })
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [cetTime])

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerColumn}>
        <div className={styles.locationContainer}>
          <div>
            New York
            <br />
            {nyTime}
          </div>
          <div>
            <a href="tel:17186246666">718 624 6666</a>
            <br />
            42 Adelphi St
            <br /> Brooklyn, NY 11205
          </div>
        </div>
      </div>
      <div className={styles.footerColumn}>
        <div className={styles.locationContainer}>
          <div>
            Amsterdam
            <br />
            {cetTime}
          </div>
          <div>
            <a href="tel:2342345698">234 234 5698</a>
            <br />
            Anne Frankstraat
            <br /> 234 1018 BZ
          </div>
        </div>
      </div>
      <div className={styles.footerColumn}>
        <Link>Contact</Link>
        <Link>Press</Link>
        <Link>Careers</Link>
        <Link>Clients</Link>
      </div>
      <div className={styles.footerColumn}>
        <Link>Newsletter</Link>
        <Link>Instagram</Link>
        <Link>LinkedIn</Link>
      </div>
    </footer>
  )
}

export default Footer
