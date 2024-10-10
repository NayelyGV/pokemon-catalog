import BaseUrl from './BaseURL';

// Obtiene los Pokémon desde la API
export const getAllPokemons = async (offset, limit) => {
    try {
        const response = await BaseUrl.get(`/pokemon?limit=${limit}&offset=${offset}`);
        return await getPokemonData(response.data.results);
    } catch (error) {
        console.error("Error fetching all Pokémon:", error);
        throw error; // Lanza el error para manejo posterior
    }
};

// Obtiene datos adicionales de los Pokémon
export const getPokemonData = async (result, isTypeSelected = false, selectedType = '') => {
    try {
        const pokemonArr = await Promise.all(result.map(async (pokemonItem) => {
            const { data } = await BaseUrl.get(`/pokemon/${pokemonItem.name}`);
            return data;
        }));

        // Ordenar por ID
        pokemonArr.sort((a, b) => a.id - b.id);

        // Filtrar si es necesario
        if (isTypeSelected && selectedType) {
            return pokemonArr.filter(pokemon => 
                pokemon.types.some(type => selectedType === type.type.name)
            );
        }

        return pokemonArr;
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        throw error; // Lanza el error para manejo posterior
    }
};

// Obtener datos de un Pokémon específico
export const fetchPokemonData = async (pokemon) => {
    try {
        const { data } = await BaseUrl.get(`/pokemon/${pokemon}`);
        const statistics = data.stats.map(stat => ({
            stat__name: stat.stat.name,
            stat__val: stat.base_stat
        }));

        return {
            weight: data.weight,
            height: data.height,
            pokeNumber: data.id,
            pokeName: pokemon,
            stats: statistics,
            abilities: data.abilities.map(ab => ab.ability.name)
        };
    } catch (error) {
        console.error("Error fetching Pokémon data:", error);
        throw error; // Lanza el error para manejo posterior
    }
};

// Obtener descripción de un Pokémon
export const fetchPokemonDescription = async (pokemonName) => {
    try {
        const { data } = await BaseUrl.get(`/pokemon-species/${pokemonName}`);
        const descriptionEntry = data.flavor_text_entries.find(entry => entry.language.name === "en");
        const generaEntry = data.genera.find(genus => genus.language.name === "en");

        return {
            description: descriptionEntry?.flavor_text || "Description not found",
            genderRate: data.gender_rate,
            genera: generaEntry?.genus || "",
        };
    } catch (error) {
        console.error("Error fetching Pokémon description:", error);
        return { description: "Description not found" }; // Devuelve un objeto por si hay error
    }
};

// Obtener detalles de la evolución
export const fetchEvoDetails = async (url) => {
    try {
        const { data } = await BaseUrl.get(url);
        const evoChain = [];
        let evoData = data.chain;

        do {
            const evoDetails = evoData.evolution_details[0] || {};
            evoChain.push({
                species_name: evoData.species.name,
                min_level: evoDetails.min_level || 1,
                trigger_name: evoDetails.trigger?.name || null,
                item: evoDetails.item || null
            });
            evoData = evoData.evolves_to[0];
        } while (evoData && evoData.hasOwnProperty('evolves_to'));

        return evoChain; // Devuelve la cadena de evolución
    } catch (error) {
        console.error("Error fetching evolution details:", error);
        throw error; // Lanza el error para manejo posterior
    }
};

// Obtener imágenes de la evolución
export const fetchEvoImages = async (evoChainArr) => {
    await Promise.all(evoChainArr.map(async (evo) => {
        try {
            const { data } = await BaseUrl.get(`/pokemon/${evo.species_name}`);
            evo.image_url = data.sprites.other.dream_world.front_default || data.sprites.other['official-artwork'].front_default;
        } catch (error) {
            console.error("Error fetching evolution images:", error);
        }
    }));
    
    return evoChainArr; // Devuelve la cadena de evolución con imágenes
};
