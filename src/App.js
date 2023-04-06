import './App.css'
import { useState, useEffect } from 'react'
import { getPokemon } from './utils/api';
import SearchBar from './Components/SearchBar/SearchBar';
import PokemonDetail from './Components/PokemonDetails/PokemonDetail';
import Pokedex from './Components/Pokedex/Pokedex';

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [pokedex, setPokedex] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if(localStorage.getItem('pokedex')) {
      setPokedex(JSON.parse(localStorage.getItem('pokedex')))
    }
    searchPokemon('charmander');
  }, [])

  useEffect(() => {
    localStorage.setItem('pokedex', JSON.stringify(pokedex));
  }, [pokedex])
  
  async function searchPokemon(pokemonName){
    const pokemonResult = await getPokemon(pokemonName);
    if (!pokemonResult.hasOwnProperty('error')) {
      setPokemon(pokemonResult);
      setErrorMessage("");
    } else {
      setErrorMessage(pokemonResult.msg);
    }
  } 

  const addToPokedex = () => {
    const result = pokedex.find(item => item.name === pokemon.name);
    if (result === undefined) {
      setPokedex([...pokedex, pokemon]);
    } else {
      alert('Pokemon già presente')
    }
  }

  const deleteFromPokedex = (name) => {
    const newPokedex = pokedex.filter(item => item.name !== name);
    setPokedex(newPokedex);
  }

  return (
    <div className="poke__app container">
      <SearchBar search={searchPokemon} errorMessage={errorMessage} />
      {pokemon && <PokemonDetail pokemon={pokemon} addHandler={addToPokedex} />}
      <Pokedex pokedex={pokedex} setPokemon={setPokemon} removeHandler={deleteFromPokedex}/>
    </div>
  )
}

export default App