import { useEffect, useState } from 'react';
import NextIcon from '../../assets/next.svg';
import PauseIcon from '../../assets/pause.svg';
import PlayIcon from '../../assets/play.svg';
import PreviousIcon from '../../assets/previous.svg';
import stopIcon from '../../assets/stop.svg';
import './style.css';

function Controls({ currentSong, audioRef, setIconBtn, iconBtn, handleChangeSong, progressRef }) {
    const [songDuration, setSongDuration] = useState('0:00')

    useEffect(() => {

        if (!currentSong.id) {
            return
        }

        audioRef.current.addEventListener('loadedmetadata', () => {
            const durationMinutes = Math.floor(audioRef.current.duration / 60)
            const durationSeconds = Math.floor(audioRef.current.duration % 60)

            if (durationSeconds < 10) {
                setSongDuration(`${durationMinutes}:0${durationSeconds}`)
                return
            }

            setSongDuration(`${durationMinutes}:${durationSeconds}`)

        })
    }, [currentSong])



    const [currentSongTime, setCurrentSongTime] = useState('0:00')
    let intervalProgress = null

    useEffect(() => {
        if (!currentSong.id) {
            return
        }

        audioRef.current.addEventListener('timeupdate', () => {
            const currentMinutes = Math.floor(audioRef.current.currentTime / 60)
            const currentSeconds = Math.floor(audioRef.current.currentTime % 60)

            if (currentSeconds < 10) {
                setCurrentSongTime(`${currentMinutes}:0${currentSeconds}`)
                return
            }

            setCurrentSongTime(`${currentMinutes}:${currentSeconds}`)
        })
    }, [currentSong])


    const playPause = () => {

        intervalProgress = setInterval(() => {
            if (audioRef.current.paused) {
                clearInterval(intervalProgress)
                return
            }

            const duration = audioRef.current.duration / 60
            const currentProgress = ((audioRef.current.currentTime / 60) / duration) * 100

            progressRef.current.style.width = `${currentProgress}%`
        }, 1);

        if (!currentSong.id) {
            return
        }

        if (audioRef.current.paused) {
            audioRef.current.play()
            setIconBtn('pause')
            return
        }
        audioRef.current.pause()
        setIconBtn('play')
    }

    const stop = () => {
        setIconBtn('play');
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        progressRef.current.style.width = '0%';
    }

    return (
        <div className='container-controls'>
            <div className='preview-names'>
                <h2>{currentSong.title}</h2>

                <strong>{currentSong.artist}</strong>
            </div>

            <div className='container-players'>
                <div className='container-buttons'>
                    <img
                        onClick={stop}
                        src={stopIcon}
                        alt="btn-control"
                    />
                    <img
                        src={PreviousIcon}
                        alt="btn-control"
                        onClick={() => handleChangeSong('previous')}
                    />
                    <img
                        src={iconBtn === 'pause' ? PauseIcon : PlayIcon}
                        alt="btn-play-pause"
                        onClick={playPause}
                    />
                    <img
                        src={NextIcon}
                        alt="btn-control"
                        onClick={() => handleChangeSong('next')}
                    />
                </div>

                <div className='container-progress'>
                    <strong className='start'>
                        {currentSongTime}
                    </strong>
                    <div className='container-bar'>
                        <div className='progress-bar'></div>
                        <div
                            ref={progressRef}
                            className='progress-bar-color'
                        ></div>
                    </div>

                    <strong className='end'>
                        {songDuration}
                    </strong>
                </div>
            </div>

            <div className='empty'>
            </div>
        </div>
    )
}

export default Controls;