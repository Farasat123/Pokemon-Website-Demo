import "./index.css";
import { useEffect, useState } from "react";
import { PokemonCards } from "./PokemonCards";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(""); // 🔹 new state for search input

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50";

  const fetchPokemon = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      const detailedPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        const data = await res.json();
        return data;
      });

      const detailedResponse = await Promise.all(detailedPokemonData);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  // 🔹 Filter Pokémon based on search input
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch the Pokemon</h1>
          {/* 🔹 Search Input */}
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />
        </header>

        <div>
          <ul className="cards">
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map((curPokemon) => (
                <PokemonCards
                  key={curPokemon.id}
                  PokemonData={curPokemon}
                />
              ))
            ) : (
              <p>No Pokémon found</p>
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Pokemon;
