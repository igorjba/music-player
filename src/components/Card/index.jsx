import './style.css';

function Card({ title, artist, description, cover }) {

    return (
        <div className='card'>
            <img src={cover} alt={`Capa da música ${title}`} />
            <h3>{title}</h3>
            <p>{artist}</p>
            <p>{description}</p>
        </div>
    )
}

export default Card;