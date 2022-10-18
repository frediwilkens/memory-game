import { useEffect, useState } from 'react';
import { CardProps } from '../../components/Card';
import fetchPokemon from '../../utils/pokeApi';
import { cardsManipulation } from '../../utils/cards-manipulation';
import './styles.css';
import GameTable from '../../components/GameTable';

function App() {
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

  return (
    <div className='app'>
      <GameTable cards={data} />
    </div>
  )
}

export default App
