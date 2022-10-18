import { useEffect, useState } from 'react';
import { CardProps } from '../../components/Card';
import fetchPokemon from '../../utils/pokeApi';
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
