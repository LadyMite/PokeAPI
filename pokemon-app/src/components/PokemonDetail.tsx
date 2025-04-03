import React from 'react';
import { Card, Badge, Spinner } from 'react-bootstrap';

// Interfaz para representar un tipo de Pokémon
interface PokemonType {
  type: {
    name: string;
  };
}

// Interfaz para representar las imágenes de un Pokémon
interface PokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
  front_default: string;
}

// Estructura de los datos de un Pokémon
interface Pokemon {
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonType[];
}

// Props esperadas por el componente PokemonDetail
interface PokemonDetailProps {
  pokemon: Pokemon | null; // Datos del Pokémon o null si no hay selección
  loading: boolean; // Indica carga de datos
  error: string | null; // Mensaje de error en caso de fallo
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon, loading, error }) => {
  if (loading) {
    // Muestra un spinner mientras se cargan los datos
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    // Muestra un mensaje de error si la solicitud falla
    return <div className="alert alert-danger mt-3">{error}</div>;
  }

  if (!pokemon) {
    // Muestra un mensaje si no se ha seleccionado ningún Pokémon
    return <p className="text-center mt-4">Selecciona un Pokémon para ver detalles</p>;
  }

  return (
    <Card className="mt-3 shadow-sm"
      style={{
        backgroundColor: '#d5f5e3',
        borderRadius: '15px' // Ajusta el valor para el radio de redondeo deseado
      }}>
      {/* Muestra la imagen del Pokémon, usando la ilustración oficial si está disponible */}
      <Card.Img
        variant="top"
        src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-50 mx-auto mt-3"

      />
      <Card.Body className="text-center">
        {/* Nombre del Pokémon con la primera letra en mayúscula */}
        <Card.Title className="text-capitalize">{pokemon.name}</Card.Title>

        {/* Muestra la altura y el peso en unidades métricas */}
        <div className="my-3">
          <div><strong>Altura:</strong> {pokemon.height / 10} m</div>
          <div><strong>Peso:</strong> {pokemon.weight / 10} kg</div>
        </div>

        {/* Muestra los tipos del Pokémon en forma de etiquetas (Badges) */}
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
