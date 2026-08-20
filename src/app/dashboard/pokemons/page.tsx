import { Metadata } from "next";
import { PokemonGrid, PokemonsResponse, SimplePokemon } from "@/pokemons";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export const metadata: Metadata = {
  title: "List Pokemons",
  description: "List of Pokemons",
};

const getPokemons = async (
  limit = 20,
  offset = 0,
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  ).then((res) => res.json());

  const pokemons = data.results.map((item) => ({
    id: item.url.split("/").at(-2)!,
    name: item.name,
  }));

  // throw new Error("Error al cargar los pokemons");

  return pokemons;
};

export default async function PokemonsPage() {
  "use cache";

  cacheTag("pokemons");

  cacheLife({
    stale: 10, // 10 seconds until considered stale
    revalidate: 60, // 1 minute until revalidated
  });

  revalidateTag("pokemons", "max");

  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col p-2">
      <div className="text-5xl mt-3 mb-16">
        List Pokemons <small className="text-blue-500">Static</small>
      </div>
      <PokemonGrid pokemons={pokemons} />
    </div>
  );
}
