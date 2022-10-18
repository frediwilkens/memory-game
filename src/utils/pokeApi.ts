import { CardProps } from "../components/Card";

async function fetchPokemon(id: number): Promise<CardProps> {
  const url: string = "https://pokeapi.co/api/v2/pokemon/";
  return fetch((url + id))
    .then((response) => response.json())
    .then((data) => {
    return {
      id: data.id,
      pokeName: data.name,
      pokeImage: data.sprites.front_default,
    }
  })
};

export default fetchPokemon;