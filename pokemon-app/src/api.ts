import axios from "axios";

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonList = async (limit = 10) => {
    try {
      const response = await axios.get(`${API_URL}?limit=${limit}`);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw error;
    }
  };
  
  export const getPokemonDetails = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
      throw error;
    }
  };
