import React, { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import Control from "./control"
import { GatsbyImage } from "gatsby-plugin-image"
import { formatTime } from "../utils/formatTime"
import full from "../images/fullScreen.svg"
import small from "../images/smallScreen.svg"
import screenfull from "screenfull"
import useWindowSize from "../utils/useWindowSize"
import * as styles from "./videoPlayer.module.css"
import { AnimatePresence, motion } from "motion/react"
import play from "../images/play.svg"
import useOnScreen from "../utils/useOnScreen"

let count = 0

const VideoPlayer = ({
  video,
  videoId,
  activeVideo,
  setActiveVideo,
  banner,
}) => {
  const videoPlayerRef = useRef(null)
  const controlRef = useRef(null)
  const fullScreenRef = useRef(null)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  const [videoState, setVideoState] = useState({
    playing: banner ? true : false,
    muted: true,
    volume: 0,
    playbackRate: 1.0,
    played: 0,
    playsinline: true,
    seeking: false,
  })

  const [hasPlayed, setHasPlayed] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(formatTime("00:00"))

  const { width, height } = useWindowSize()
  const isMobile = height > width ? width < 769 : width < 900

  //Destructuring the properties from the videoState
  const { playing, muted, volume, playbackRate, played, seeking } = videoState

  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.duration
    : "00:00"

  const formatDuration = formatTime(duration)

  const playPauseHandler = () => {
    //plays and pause the video (toggling)
    setVideoState({ ...videoState, playing: !videoState.playing })
    setActiveVideo(videoId)
  }

  const rewindHandler = () => {
    //Rewinds the video player reducing 5
    if (videoPlayerRef.current.currentTime > 5) {
      videoPlayerRef.current.currentTime =
        videoPlayerRef.current.currentTime - 5
    } else {
      videoPlayerRef.current.currentTime = 0
    }
  }

  const handleFastFoward = () => {
    //FastFowards the video player by adding 5
    videoPlayerRef.current.currentTime = videoPlayerRef.current.currentTime + 5
  }

  const progressHandler = state => {
    if (count > 20) {
      controlRef.current.style.visibility = "hidden"
      fullScreenRef.current.style.visibility = "hidden" // toggling player control container
    } else {
      count += 1
    }

    if (!seeking) {
      setVideoState({ ...videoState, ...state })
    }
  }

  const seekHandler = (e, value) => {
    setVideoState({
      ...videoState,
      played: value,
    })
    videoPlayerRef.current.currentTime =
      (value / 100) * videoPlayerRef.current.duration
  }

  const seekMouseUpHandler = (e, value) => {
    setVideoState({ ...videoState, played: value, playing: true })
    videoPlayerRef.current.currentTime =
      (value / 100) * videoPlayerRef.current.duration
    videoPlayerRef.current.play()
  }

  const volumeChangeHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: Number(newVolume) === 0 ? true : false, // volume === 0 then muted
    })
  }

  const volumeSeekUpHandler = (e, value) => {
    const newVolume = parseFloat(value) / 100

    setVideoState({
      ...videoState,
      volume: newVolume,
      muted: newVolume === 0 ? true : false,
    })
  }

  const muteHandler = () => {
    //Mutes the video player
    setVideoState({
      ...videoState,
      muted: !videoState.muted,
      volume: volume === 1 ? 0 : 1,
    })
  }

  const onSeekMouseDownHandler = e => {
    videoPlayerRef.current.pause()
    setVideoState({ ...videoState, playing: false })
  }

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = "visible"
    fullScreenRef.current.style.visibility = "visible"
    count = 0
  }

  const handleClickFullscreen = () => {
    if (!screenfull.isFullscreen && !isMobile && screenfull.isEnabled) {
      screenfull.request(document.getElementById(videoId))
    } else {
      document.exitFullscreen()
    }
  }

  useEffect(() => {
    if (!isOnScreen && hasPlayed) {
      setVideoState(prevVideoState => ({ ...prevVideoState, playing: false }))
    } else if (isOnScreen) {
      setVideoState(prevVideoState => ({ ...prevVideoState, playing: true }))
    } else {
      return
    }
  }, [isOnScreen, hasPlayed])

  return (
    <div className={styles.videoPlayerContainer}>
      <div
        className={styles.videoPlayer}
        style={{
          aspectRatio: video.aspectRatio ? video.aspectRatio : "16 / 9",
        }}
        id={videoId}
        key={isMobile}
        ref={elementRef}
      >
        <AnimatePresence>
          {!hasPlayed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="video-poster"
              className={styles.coverImageContainer}
              onClick={playPauseHandler}
            >
              <GatsbyImage
                image={video.posterImage?.gatsbyImageData}
                alt={video.posterImage?.description}
                className={styles.coverImage}
              ></GatsbyImage>
            </motion.div>
          )}
          {isMobile && !hasPlayed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.playOverlay}
              onClick={playPauseHandler}
            >
              <img
                src={play}
                alt="play"
                className={styles.overlayPlayBtn}
              ></img>
            </motion.button>
          )}
        </AnimatePresence>
        {!isMobile && (
          <button
            className={`${styles.overlay} ${
              muted
                ? styles.bannerVideoContainerMuted
                : styles.bannerVideoContainerSound
            }`}
            onMouseMove={isMobile ? null : banner ? null : mouseMoveHandler}
            onClick={muteHandler}
            aria-label={"mute or unmute"}
          ></button>
        )}
        <ReactPlayer
          src={video.videoLink}
          ref={videoPlayerRef}
          width={"100%"}
          height={"100%"}
          className={styles.videoPlayerVideo}
          controls={isMobile}
          playing={playing}
          playsInline
          onPlay={() => {
            setVideoState({ ...videoState, playing: true })
            setHasPlayed(true)
          }}
          onPause={() => setVideoState({ ...videoState, playing: false })}
          volume={volume}
          muted={muted}
          onTimeUpdate={() => {
            setVideoState({
              ...videoState,
              played:
                (videoPlayerRef.current.currentTime /
                  videoPlayerRef.current.duration) *
                100,
            })
            setTimeElapsed(formatTime(videoPlayerRef.current.currentTime))
          }}
          onEnded={() => {
            videoPlayerRef.current.currentTime = 0
            setVideoState({ ...videoState, playing: false })
            setHasPlayed(false)
          }}
        ></ReactPlayer>
        {!isMobile && !banner && (
          <Control
            ref={controlRef}
            onPlayPause={playPauseHandler}
            playing={playing}
            onRewind={rewindHandler}
            onForward={handleFastFoward}
            played={played}
            onSeek={seekHandler}
            onSeekMouseUp={seekMouseUpHandler}
            volume={volume}
            onVolumeChangeHandler={volumeChangeHandler}
            onVolumeSeekUp={volumeSeekUpHandler}
            mute={muted}
            onMute={muteHandler}
            playRate={playbackRate}
            duration={formatDuration}
            currentTime={timeElapsed}
            onMouseSeekDown={onSeekMouseDownHandler}
          ></Control>
        )}
        {!isMobile && (
          <button
            className={styles.fullScreenBtn}
            ref={fullScreenRef}
            onClick={handleClickFullscreen}
          >
            <img
              src={screenfull.isFullscreen ? small : full}
              alt="full screen"
            ></img>
          </button>
        )}
      </div>
    </div>
  )
}

export default VideoPlayer
