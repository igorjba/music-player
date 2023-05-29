import { useRef, useState } from 'react'
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
    cover: '',
    active: false
  })

  const setSong = (song) => {
    const newSongsData = songsData.map((music) => {
      if (music.id === song.id) {
        return {
          ...music,
          active: true
        };
      } else {
        return {
          ...music,
          active: false
        };
      }
    });

    setSongsData(newSongsData);

    if (audioRef.current.paused) {
      audioRef.current.src = song.url;
      setCurrentSong(song);
    } else {
      audioRef.current.pause();
      audioRef.current.src = song.url;
      audioRef.current.play();
      setCurrentSong(song);
    }

    setIconBtn(audioRef.current.paused ? 'play' : 'pause');
  }

  const handleChangeSong = (option) => {
    if (!currentSong.id) {
      return;
    }

    progressRef.current.value = 0;

    let newSongId;
    if (option === 'next') {
      newSongId = currentSong.id + 1;
      if (newSongId > songsData.length) {
        newSongId = 1;
      }
    } else if (option === 'previous') {
      newSongId = currentSong.id - 1;
      if (newSongId === 0) {
        newSongId = songsData.length;
      }
    }

    const otherSong = songsData.find((song) => song.id === newSongId);

    if (!otherSong) {
      return;
    }

    setSong(otherSong);
    progressRef.current.style.width = '0%';
  }

  return (
    <div className='container'>
      <Header />
      <main>
        <h2>The best playlist</h2>
        <div className='container-cards'>
          {songsData.map(song => (
            <div
              onClick={
                () => setSong(song)
              }
              key={song.id}
            >
              <Card
                className={`card ${song.active ? 'active' : ''}`}
                title={song.title}
                artist={song.artist}
                description={song.description}
                cover={song.cover}
                active={currentSong.id === song.id}
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
