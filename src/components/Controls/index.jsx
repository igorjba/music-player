import './style.css';
import PlayIcon from '../../assets/play.svg';
import PauseIcon from '../../assets/pause.svg';
import NextIcon from '../../assets/next.svg';
import PreviousIcon from '../../assets/previous.svg';
import stopIcon from '../../assets/stop.svg';

function Controls() {
    return (
        <div className='container-controls'>
            <div className='preview-names'>
                <h2>Título</h2>
                <strong>Sub Título</strong>
            </div>

            <div className='container-players'>
                <div className='container-buttons'>
                    <img
                        src={stopIcon}
                        alt="btn-control"
                    />
                    <img
                        src={PreviousIcon}
                        alt="btn-control"
                    />
                    <img
                        src={PauseIcon}
                        alt="btn-play-pause"
                    />
                    <img
                        src={NextIcon}
                        alt="btn-control"
                    />
                </div>

                <div className='container-progress'>
                    <strong className='start'>0</strong>
                    <div className='container-bar'>
                        <div className='progress-bar'></div>
                        <div className='progress-bar-color'></div>
                    </div>

                    <strong className='end'>3:45</strong>
                </div>
            </div>

            <div className='empty'>

            </div>
        </div>
    )
}

export default Controls;