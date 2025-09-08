import React, { useRef } from "react"
import { motion } from "motion/react"

const SliderScrollBar = ({
  containerWidth,
  thumbWidth,
  sliderWidth,
  x,
  offset,
  scrollBarRef,
  gallery
}) => {
  const thumbRef = useRef(null)

  const styles = {
    scrollBar: {
      position: "relative",
      display: "flex",
      height: "8px",
      width: "100%",
      cursor: "pointer",
      alignItems: "center",
      marginBottom: gallery ? "200px" : "80px",
    },
    track: {
      height: "1px",
      width: "100%",
      backgroundColor: "#000000",
    },
    thumb: {
      position: "absolute",
      height: "8px",
      cursor: "grab",
      backgroundColor: "#000000",
    },
  }

  if (sliderWidth <= containerWidth) return null

  const handleThumbDrag = () => {
    const thumb = thumbRef.current
    const scrollBar = scrollBarRef.current
    if (!thumb || !scrollBar) return

    const thumbX =
      thumb.getBoundingClientRect().x - scrollBar.getBoundingClientRect().x
    const denominator = scrollBar.clientWidth - thumbWidth
    if (denominator <= 0) return

    const xPercent = thumbX / denominator
    const sliderNewX = xPercent * (containerWidth - sliderWidth)
    x.set(sliderNewX)
  }

  const handleScrollBarClick = event => {
    if (event.target === thumbRef.current) return

    const scrollBar = scrollBarRef.current
    if (!scrollBar) return

    const bounds = scrollBar.getBoundingClientRect()
    const clickX = event.clientX - bounds.left
    const scrollPercent = clickX / bounds.width

    const clampedPercent = Math.max(0, Math.min(1, scrollPercent))
    const newX = (containerWidth - sliderWidth) * clampedPercent
    x.set(newX)
  }

  return (
    <div
      style={styles.scrollBar}
      onClick={handleScrollBarClick}
      ref={scrollBarRef}
    >
      <div style={styles.track} />
      <motion.div
        ref={thumbRef}
        style={{
          ...styles.thumb,
          width: thumbWidth,
          x: offset,
        }}
        drag="x"
        dragConstraints={{
          left: 0,
          right: containerWidth - thumbWidth,
        }}
        dragMomentum={false}
        dragElastic={false}
        onDrag={handleThumbDrag}
      />
    </div>
  )
}

export default SliderScrollBar
