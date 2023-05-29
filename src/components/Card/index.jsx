import './style.css';

function Card({ title, artist, description, cover, active }) {

    return (
        <div
            className={`card ${active ? 'active' : ''}`}
        >
            <img src={cover} alt={`Capa da música ${title}`} />
            <h3>{title}</h3>
            <p>{artist}</p>
            <p>{description}</p>
        </div>
    )
}

export default Card;