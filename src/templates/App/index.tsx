import { useEffect, useState } from 'react';
import Card, { CardProps } from '../../components/Card';
import fetchPokemon from '../../utils/pokeApi';
import { cardsManipulation } from '../../utils/cards-manipulation';
import './styles.css';

function App() {
  const handleClick = (id: any) => console.log(id);
  const [data, setData] = useState(() => [] as CardProps[]);

  useEffect(() => {
    const getPokemons = async () => {
      const pokeArray = [];
      for (let index = 1; index <= 4; index += 1) {
        const pokemon: CardProps = await fetchPokemon(index);
        pokeArray.push(pokemon);
      }
      setData(pokeArray);
      setData((prev) => cardsManipulation(prev));
    }
    getPokemons();
  },[]);

  console.log(data);

  return (
    data.map((card) => (
      <Card
        key={card.id}
        id={card.id}
        pokeName={card.pokeName}
        pokeImage={card.pokeImage}
        flipped
        handleClick={handleClick}
      />
    ))    
  )
}

export default App
