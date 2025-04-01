//import { useState } from 'react'
import './App.css'
import './components/PokemonList'
import PokemonList from './components/PokemonList'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <div className="container mt-4">
      <h1 className="text-center">Pokemon App</h1>
      <PokemonList />
    </div>
    </>
  )
}

export default App
