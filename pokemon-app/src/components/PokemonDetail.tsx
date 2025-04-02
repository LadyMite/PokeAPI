// src/components/PokemonDetail.tsx
import React from 'react';
import { Card, Badge, Spinner } from 'react-bootstrap';

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
  front_default: string;
}

interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
}

interface PokemonDetailProps {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, loading, error }) => {
  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!pokemon) {
    return <p className="text-center mt-4">Selecciona un Pokémon para ver detalles</p>;
  }

  return (
    <Card className="mt-3 shadow-sm"
    style={{ 
      backgroundColor: '#d5f5e3',
      borderRadius: '15px' // Ajusta el valor para el radio de redondeo deseado
    }}>
      <Card.Img 
        variant="top" 
        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
        alt={pokemon.name}
        className="w-50 mx-auto mt-3"

      />
      <Card.Body className="text-center">
        <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>
        <div className="my-3">
          <div><strong>Altura:</strong> {pokemon.height / 10} m</div>
          <div><strong>Peso:</strong> {pokemon.weight / 10} kg</div>
        </div>
        <div>
          <strong>Tipos:</strong>
          <div className="d-flex justify-content-center gap-2 mt-2">
            {pokemon.types.map((typeInfo) => (
              <Badge 
                key={typeInfo.type.name}
                bg="primary"
                className="text-capitalize p-2"
              >
                {typeInfo.type.name}
              </Badge>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PokemonDetail;
