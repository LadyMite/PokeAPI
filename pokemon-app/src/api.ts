import axios from 'axios';

// Obtener los primeros 10 Pokémon
export const getPokemons = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
  return response.data.results;
};

// Obtener los detalles de un Pokémon
export const getPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};