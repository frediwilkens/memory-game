import { useRef, useState } from 'react';
import { cardsManipulation } from '../../utils/cards-manipulation';
import Card, { CardProps } from '../Card';
import './styles.css';

export interface GameTableProps {
  cards: CardProps[];
}

function GameTable({ cards }: GameTableProps) {
  const [gameCards, setGameCards] = useState(() => {
    return cardsManipulation(cards);
  })

  const first = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef(false);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleReset = () => {
    setGameCards(cardsManipulation(cards));
    first.current = null;
    second.current = null;
    unflip.current = false;
    setMatches(0);
    setMoves(0);
  }

  const handleClick = (id: string) => {
    const newGameCards = gameCards.map((card) => {
      if (card.id !== id) return card;
      if (card.flipped) return card;

      if (unflip.current && first.current && second.current) {
        first.current.flipped = false;
        second.current.flipped = false;
        first.current = null;
        second.current = null;
        unflip.current = false;
      }
      card.flipped = true;

      if (first.current === null) {
        first.current = card;
      } else if (second.current === null) {
        second.current = card;
      }

      if (first.current && second.current) {
        if (first.current.pokeName === second.current.pokeName) {
          first.current = null;
          second.current = null;
          setMatches((prev) => prev + 1);
        } else {
          unflip.current = true;
        }
        setMoves((prev) => prev + 1);
      }
      return card;
    });

    setGameCards(newGameCards);
  }
  return (
    <>
      <div className="text">
        <h1>Memory Game</h1>
        <p> Moves: {moves} | Matches: {matches} | <button onClick={handleReset}>Reset</button></p>
      </div>
      <div className="grid">
        {
          gameCards.map((card) => {
            return <Card {...card} key={card.id} handleClick={handleClick} />;
          })
        }
      </div>
    </>
  );
}

export default GameTable;