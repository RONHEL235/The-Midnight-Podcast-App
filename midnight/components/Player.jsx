import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MdPause } from "react-icons/md"
import { IoPlaySharp } from "react-icons/io5"
import { IoIosSkipForward } from "react-icons/io"
import { IoIosSkipBackward } from "react-icons/io"

const AudioPlayer = styled.div`
    display: flex;
    align-items: center;
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
`

const Episode = styled.h4`
    font-family: Roboto;
`

const TheImage = styled.img`
    width: 60px;
    height: 50px;
`

const TheLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 18px;
    margin-right: 15%;
    margin-left: 40px;
`

const TheRight = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    left: 37%;
`

export default function Player({episodeTitle, episodeImage, audioSource}) {
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
            <AudioPlayer>
                <TheLeft>
                    <TheImage src={episodeImage} />    
                    <Episode>{episodeTitle}</Episode>
                </TheLeft>
                <TheRight>
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
            </TheRight>
            </AudioPlayer>
        </div>
    )
}

Player.propTypes = {
    episodeTitle: PropTypes.string.isRequired,
    episodeImage: PropTypes.string.isRequired,
    audioSource: PropTypes.string.isRequired,
  }