"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from ".";
import { setFavoritePokemons } from "./pokemons/pokemonsSlice";

interface Props {
  children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorite-pokemons") ?? "{}");
    const favorites = stored.favorites ?? stored;
    store.dispatch(setFavoritePokemons(favorites));
  }, []);
  return <Provider store={store}>{children}</Provider>;
};
