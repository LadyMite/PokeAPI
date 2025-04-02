import React from 'react';
import { ListGroup, Card, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemons: Pokemon[];
  loading: boolean;
  onPokemonSelect: (url: string) => void;
  selectedUrl: string | null;
  error: string | null; // Asegurarse de que `error` está incluido como prop
}

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
  error: PropTypes.string, // Propiedad para el error
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
              <Spinner animation="border" className="d-block mx-auto mt-4" />
            ) : (
              pokemons.map((pokemon) => (
                <ListGroup.Item 
                  key={pokemon.name}
                  action
                  active={pokemon.url === selectedUrl}
                  onClick={() => onPokemonSelect(pokemon.url)}
                  className="text-capitalize"
                >
                  {pokemon.name}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PokemonList;
