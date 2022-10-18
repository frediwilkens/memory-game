import Card, { CardProps } from '../Card';
import './styles.css';

export interface GameTableProps {
  cards: CardProps[];
}

function GameTable({ cards }: GameTableProps) {
  return (
    <div className="grid">
      {
        cards.map((card) => {
          return <Card {...card} key={card.id} flipped />;
        })
      }
    </div>
  );
}

export default GameTable;