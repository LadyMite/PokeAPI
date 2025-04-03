import React from 'react';
import { ListGroup, Card, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

//estructura dle pokemon
interface Pokemon {
  name: string;
  url: string;
}

// Props esperadas por el componente PokemonList
interface PokemonListProps {
  pokemons: Pokemon[]; // Lista de Pokémon obtenidos de la API
  loading: boolean; //indica carga de datos
  onPokemonSelect: (url: string) => void; // funcion para seleccionar pokemon
  selectedUrl: string | null; // url d epokemon seleccionado
  error: string | null; // Asegurarse de que `error` está incluido como prop
}

// Definición de PropTypes para validación en tiempo de ejecución
PokemonList.propTypes = {
  pokemons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onPokemonSelect: PropTypes.func.isRequired,
  selectedUrl: PropTypes.string,
  error: PropTypes.string, // // Validación de la prop `error`
};

function PokemonList({ pokemons, loading, onPokemonSelect, selectedUrl, error }: PokemonListProps) {
  return (
    <div>
      <Card className="mb-3 shadow-sm">
        <Card.Body style={{
          backgroundColor: '#d5f5e3',
          borderRadius: '15px' // Ajusta el valor para el radio de redondeo deseado
        }}>
          <h3 className="mb-3 text-center">Pokémon</h3>
          <ListGroup
            style={{
              backgroundColor: '#eafaf1',
              borderRadius: '15px' // Ajusta el valor para el radio de redondeo deseado
            }}>
            {loading ? (
              // Muestra un spinner mientras los datos se cargan
              <Spinner animation="border" className="d-block mx-auto mt-4" />
            ) : (
              // Muestra la lista de Pokémon con opción de selección
              pokemons.map((pokemon) => (
                <ListGroup.Item
                  key={pokemon.name}
                  action
                  active={pokemon.url === selectedUrl} // Resalta el Pokémon seleccionado
                  onClick={() => onPokemonSelect(pokemon.url)}
                  className="text-capitalize"
                >
                  {pokemon.name}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {/* Muestra un mensaje de error si existe */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PokemonList;
