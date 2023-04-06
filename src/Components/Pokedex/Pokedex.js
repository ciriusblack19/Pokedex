import './Pokedex.css'

const Pokedex = ({ pokedex, setPokemon, removeHandler }) => {
  const handleShow = (pokemon) => {
    setPokemon(pokemon);
  };

  const handleRemove = (name) => {
    removeHandler(name);
  };

  const renderPokedex = () => {
    if (pokedex.length === 0) {
      return <h4>Attualmente non hai pokemon nel tuo pokedex.</h4>;
    }

    return pokedex.map((pokemon) => (
      <div className="pokedex__item" key={pokemon.id}>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <button className="small-btn" onClick={() => handleShow(pokemon)}>
          Mostra
        </button>
        <button
          className="small-btn button-outline"
          onClick={() => handleRemove(pokemon.name)}
        >
          Elimina
        </button>
      </div>
    ));
  };

  return (
    <div className="pokedex">
      <h2>Il tuo Pokedex</h2>
      <div className="pokedex__items">{renderPokedex()}</div>
    </div>
  );
};

export default Pokedex