"use client";

import { useAppSelector } from "@/store";
import { PokemonGrid } from "./PokemonGrid";
import { NoFavorites } from "./NoFavorites";

export const PokemonFavorite = () => {
  const pokemons = useAppSelector((state) => state.pokemons.favorites);
  const pokemonFavorites = Object.values(pokemons);
  return (
    <>
      {pokemonFavorites.length > 0 ? (
        <PokemonGrid pokemons={pokemonFavorites} />
      ) : (
        <NoFavorites />
      )}
    </>
  );
};
