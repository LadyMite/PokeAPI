import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import { getPokemons, getPokemonDetails } from './api';

function App() {
  // Estados para manejar la lista de Pokémon y su información
  const [pokemons, setPokemons] = useState([]); // Lista de Pokémon
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);  // URL del Pokémon seleccionado
  const [pokemonData, setPokemonData] = useState(null); // Datos detallados del Pokémon seleccionado
  const [loadingList, setLoadingList] = useState(true); // Estado de carga de la lista
  const [loadingDetail, setLoadingDetail] = useState(false); // Estado de carga del detalle
  const [error, setError] = useState<string | null>(null); // Mensaje de error si hay problemas al cargar datos

   // Cargar lista de Pokémon al montar el componente
  useEffect(() => {
    const fetchPokemons = async () => {
      console.log('Cargando lista de Pokémon...');
      try {
        const data = await getPokemons(); // Llamada a la API para obtener los Pokémon
        setPokemons(data);
      } catch (error) {
        console.error(error);
        setError('Error al cargar la lista de Pokémon');
      } finally {
        setLoadingList(false);
        console.log('Lista de Pokémon cargada');
      }
    };

    fetchPokemons();
  }, []);

  // Función para manejar la selección de un Pokémon
  const handlePokemonSelect = async (url: string) => {
    console.log('Cargando detalles del Pokémon...');
    setSelectedUrl(url);
    setLoadingDetail(true);

    try {
      const data = await getPokemonDetails(url); // Llamada a la API para obtener detalles
      setPokemonData(data);
      console.log('Detalles del Pokémon cargados:', data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError('Error al cargar los detalles del Pokémon');
      setPokemonData(null);
    } finally {
      setLoadingDetail(false);
      console.log('Detalles del Pokémon cargados');
    }
  };


  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{
        justifyContent: 'center',
        width: '400vh',
        height: '100vh',
        aspectRatio: '1/1',
        borderRadius: '40px' // redondeo
      }}
    >


      <Card className="border shadow-sm p-4 align-items-center" style={{ backgroundColor: '#abebc6', borderRadius: '15px' }}>
        <h1 className="text-center mb-4" style={{ fontFamily: 'Roboto, sans-serif' }}>Pokemon App</h1>
        <Row>
          <Col md={4} className="d-flex justify-content-center">
            <PokemonList
              pokemons={pokemons}
              loading={loadingList}
              onPokemonSelect={handlePokemonSelect}
              selectedUrl={selectedUrl}
              error={error}

            />
          </Col>
          <Col md={8} className="d-flex justify-content-center">
            <PokemonDetail
              pokemon={pokemonData}
              loading={loadingDetail}
              error={error}
            />
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default App;
