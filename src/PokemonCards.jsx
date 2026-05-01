export const PokemonCards = ({ PokemonData }) => {
  return (
    <li className="pokemon-card">
      <figure>
        <img
          src={PokemonData.sprites.other.dream_world.front_default}
          alt={PokemonData.name}
          className="pokemon-image"
        />
      </figure>

      {/* Name */}
      <h2 className="pokemon-name">{PokemonData.name}</h2>

      {/* Types */}
      <div className="types">
        {PokemonData.types.map((typeObj, index) => (
          <span key={index} className="type-badge">
            {typeObj.type.name}
          </span>
        ))}
      </div>

      {/* Info */}
      <div className="pokemon-info">
        <p>Height: {PokemonData.height}</p>
        <p>Weight: {PokemonData.weight}</p>
        <p>Speed: {PokemonData.stats[5].base_stat}</p>
        <p>Experience: {PokemonData.base_experience}</p>
        <p>Attack: {PokemonData.stats[1].base_stat}</p>
        <p>Abilities: {PokemonData.abilities[0].ability.name}</p>
      </div>
    </li>
  );
};
