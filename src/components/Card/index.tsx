import './styles.css';

export interface CardProps {
  id: string;
  flipped?: boolean;
  pokeName: string;
  pokeImage: string;
  handleClick?: (id: string) => void;
}

function Card({
    id, flipped = false,
    pokeName, pokeImage, handleClick
  }: CardProps) {
  const cardContentClasses = ['card-content'];
  flipped && cardContentClasses.push('card-flipped');

  const handleClickFn = (id: string) => {
    if (handleClick) {
      handleClick(id)
    }
  }

  return (
    <div className="card" onClick={() => handleClickFn(id)}>
      <div className={cardContentClasses.join(' ')}>
        <div className="card-face face-front">?</div>
        <div className="card-face face-back">
          <img src={pokeImage} />
          <p>{pokeName}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;
