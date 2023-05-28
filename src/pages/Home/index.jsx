import { useEffect, useRef, useState } from 'react'
import Card from '../../components/Card'
import Controls from '../../components/Controls'
import Header from '../../components/Header'
import { songs } from '../../data/songs'
import './style.css'

function Home() {
  const progressRef = useRef(null);
  const [iconBtn, setIconBtn] = useState('play')
  const audioRef = useRef(null);
  const [songsData, setSongsData] = useState([...songs])
  const [currentSong, setCurrentSong] = useState({
    id: 0,
    title: '',
    artist: '',
    description: '',
    url: '',
    cover: ''
  })

  const setSong = (song) => {
    audioRef.current.src = song.url
    setIconBtn('play')
    setCurrentSong(song)
  }


  const handleChangeSong = (option) => {
    if (!currentSong.id) {
      return
    }

    progressRef.current.value = 0


    const newSongId = option === 'next'
      ? currentSong.id + 1
      : currentSong.id - 1;

    const otherSong = songsData.find((song) => song.id === newSongId)

    if (!otherSong) {
      return
    }
    setSong(otherSong);
    progressRef.current.style.width = '0%'
  }




  return (
    <div className='container'>
      <Header />
      <main>
        <h2>The best playlist</h2>
        <div className='container-cards'>
          {songsData.map(song => (
            <div
              onClick={() => setSong(song)}
              key={song.id}
            >
              <Card
                title={song.title}
                artist={song.artist}
                description={song.description}
                cover={song.cover}
              />
            </div>
          ))}
        </div>
      </main>
      <Controls
        currentSong={currentSong}
        audioRef={audioRef}
        setIconBtn={setIconBtn}
        iconBtn={iconBtn}
        handleChangeSong={handleChangeSong}
        progressRef={progressRef}
      />

      <audio ref={audioRef} />

    </div>

  )
}

export default Home
