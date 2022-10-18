import { useEffect, useState } from 'react';
import { CardProps } from '../../components/Card';
import fetchPokemon from '../../utils/pokeApi';
import './styles.css';
import GameTable from '../../components/GameTable';
import { getRandomIntInclusive } from '../../utils/cards-manipulation';

function App() {
  const [data, setData] = useState(() => [] as CardProps[]);

  useEffect(() => {
    const getPokemons = async () => {
      const pokeArray: CardProps[] = [];
      for (let index = 1; index <= 8; index += 1) {
        const randomPokeId = getRandomIntInclusive(index);
        let pokemon: CardProps = await fetchPokemon(randomPokeId);
        if (pokeArray.some((poke) => poke === pokemon)) {
          const newRandomId = getRandomIntInclusive(index, (randomPokeId - 1));
          const newPokemon = await fetchPokemon(newRandomId);
          pokeArray.push(newPokemon);
        } else {
          pokeArray.push(pokemon);
        }
      }
      setData(pokeArray);
    }
    getPokemons();
  },[]);
  
  return (
    <div className='app'>
      {
        data.length <= 0 ? <h1>Loading</h1>
          : <GameTable cards={data} />
      }
    </div>
  )
}

export default App
