import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdPause } from "react-icons/md";
import { IoPlaySharp } from "react-icons/io5";
import { IoIosSkipForward } from "react-icons/io";
import { IoIosSkipBackward } from "react-icons/io";

const AudioPlayer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    background: #262525;
    color: #fff;
    padding: 13px;
    width: 100%;
`

const PlayPause = styled.div`
    font-size: 24px;
    margin-left: 30px;
    cursor: pointer;
`

const TimeDuration = styled.div`
    font-family: Roboto;
    margin-left: 30px;
    cursor: pointer;
`

const ProgressBar = styled.div`
    margin-left: 20px;
`

const PrevNext = styled.div`
    font-size: 22px;
    margin-left: 30px;
    cursor: pointer;
`

const AudioController = styled.div`
    display: flex;
    align-items: center;
    margin-left: 20px;
`

const Episode = styled.h3`
    color: white;
`

export default function Player({episodeTitle, audioSource}) {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [currentTime, setCurrentTime] = React.useState(0)
    const [duration, setDuration] = React.useState(0)
    const audioPlayer = React.useRef()

    const togglePlayPause = () => {
        setIsPlaying((prevState) => !prevState)
    }

    React.useEffect(() => {
        let currentAudio = audioPlayer.current

      if (audioSource) {
        currentAudio.src = audioSource
        if (!isPlaying) {
            currentAudio.play()
        }
      }
      
      return () => {
        currentAudio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        currentAudio.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }, [audioSource, isPlaying])

    const handleLoadedMetadata = () => {
        setDuration(audioPlayer.current.duration)
    }
    
    const handleTimeUpdate = () => {
        setCurrentTime(audioPlayer.current.currentTime)
    }

    React.useEffect(() => {
        const currentAudio = audioPlayer.current

        currentAudio.addEventListener('loadedmetadata', handleLoadedMetadata)
        currentAudio.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            currentAudio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            currentAudio.removeEventListener('timeupdate', handleTimeUpdate)          }
    }, [])

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
      }

    return (
        <div>
            <Episode>{episodeTitle}</Episode>
            <AudioPlayer>
                <audio 
                ref={audioPlayer} 
                preload="metadata"
                onEnded={() => setIsPlaying(false)}></audio>
                <PrevNext><IoIosSkipBackward /></PrevNext>
                <PlayPause onClick={togglePlayPause}>{isPlaying? <IoPlaySharp /> : <MdPause />}</PlayPause> 
                <PrevNext><IoIosSkipForward /></PrevNext>

                <AudioController>
                    {/* current time  */}
                    <TimeDuration>{formatTime(currentTime)}</TimeDuration>

                    {/* progress bar */}
                    <ProgressBar>
                        <input 
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTime}
                        onChange={(e) => {
                        setCurrentTime(parseInt(e.target.value, 10))
                        audioPlayer.current.currentTime = parseInt(e.target.value, 10)}}
                        />
                    </ProgressBar>

                    {/* duration */}
                    <TimeDuration>{formatTime(duration)}</TimeDuration>
                </AudioController>
            </AudioPlayer>
        </div>
    )
}

Player.propTypes = {
    episodeTitle: PropTypes.string.isRequired,
    audioSource: PropTypes.string.isRequired,
  }