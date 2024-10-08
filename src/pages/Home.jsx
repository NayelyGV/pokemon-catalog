import React from 'react';
import Pokemon from "../components/Pokemon";
import InfoDialog from "../components/InfoDialog";
import BaseUrl from '../services/BaseURL';
import Scroll from '../components/Scroll';
import Loading from '../components/Loading';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination'; 
import { motion } from "framer-motion";
import { list, items } from '../utils/animations'; 
import Favorites from './Favorites';
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPokemons: [],
            searchPokemons: [],
            filterPokemons: [],
            evoChain: [],
            abilities: "",
            height: "",
            weight: "",
            catergory: "",
            stats: [],
            imageURL: "",
            pokeName: "",
            pokeNumber: "",
            genderRate: "",
            genera: "",
            isTypeSelected: false,
            selectedType: "",
            showInfo: false,
            isSearch: false,
            searchString: "",
            description: "",
            showLoading: true,
            isFilter: false,
            noDataFound: false,
            limit: 151,
            offset: 0,
            isChecked: false,
            evolID: "",
            evolName: "",
            evolTypes: [],
            evolImgURL: "",
            regions: [
                { name: "Kanto", limit: 151, offset: 0 },
                { name: "Johto", limit: 100, offset: 151 },
                { name: "Hoenn", limit: 135, offset: 251 },
                { name: "Sinnoh", limit: 108, offset: 386 },
                { name: "Unova", limit: 155, offset: 494 },
                { name: "Kalos", limit: 72, offset: 649 },
                { name: "Alola", limit: 88, offset: 721 },
                { name: "Galar", limit: 89, offset: 809 }
            ],
            types: [
                "All types", "grass", "bug", "dark", "dragon", "electric", "fairy", "fighting", "fire", "flying", "ghost", "ground", "ice", "normal", "poison", "psychic", "rock", "steel", "water"
            ],
            sortby: ["ID", "Name"],
            currentPage: 1,
            pokemonsPerPage: 8,
            favorites: [],
            favoritesFilter: false
            
        }
    }
    //ciclo de vida
    componentDidMount() {
        this.getAllPokemons(this.state.offset, this.state.limit);
        const currentTheme = document.documentElement.getAttribute('data-theme');
        this.setState({ isChecked: currentTheme === "dark" });
    }
    //Obtiene los pokemoes desde la api
    getAllPokemons = async (offset, limit) => {
        try {
            const response = await BaseUrl.get(`/pokemon?limit=${limit}&offset=${offset}`);
            this.getPokemonData(response.data.results);
        } catch (error) {
            console.error("Error:", error);
            this.setState({ showLoading: false }); // Cambiar el estado si hay un error
        }
    }

     //Obtiene  datos adicionales de los pokemones 
    getPokemonData = async (result) => {
        const pokemonArr = await Promise.all(result.map(async (pokemonItem) => {
            const { data } = await BaseUrl.get(`/pokemon/${pokemonItem.name}`);
            return data;
        }));

        pokemonArr.sort((a, b) => a.id - b.id);

        if (this.state.isTypeSelected) {
            const filterArr = pokemonArr.filter(pokemon =>
                pokemon.types.some(type => this.state.selectedType === type.type.name)
            );

            this.setState({
                isFilter: true,
                filterPokemons: filterArr,
                allPokemons: pokemonArr,
                showLoading: false
            });
        } else {
            this.setState({
                isFilter: false,
                allPokemons: pokemonArr,
                showLoading: false,
            });
        }
    }

    closeDialog = () => {
        this.setState({ showInfo: false });
    }

    fetchEvoDetails = async (url) => {
        try {
            const { data } = await BaseUrl.get(url);
            const evoChain = [];
            let evoData = data.chain;

            do {
                const evoDetails = evoData.evolution_details[0];
                evoChain.push({
                    species_name: evoData.species.name,
                    min_level: evoDetails ? evoDetails.min_level : 1,
                    trigger_name: evoDetails ? evoDetails.trigger.name : null,
                    item: evoDetails ? evoDetails.item : null
                });
                evoData = evoData.evolves_to[0];
            } while (evoData && evoData.hasOwnProperty('evolves_to'));

            this.fetchEvoImages(evoChain);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    fetchEvoImages = async (evoChainArr) => {
        await Promise.all(evoChainArr.map(async (evo) => {
            try {
                const { data } = await BaseUrl.get(`/pokemon/${evo.species_name}`);
                evo.image_url = data.sprites.other.dream_world.front_default || data.sprites.other['official-artwork'].front_default;
            } catch (error) {
                console.log("Error:", error);
            }
        }));

        this.setState({ evoChain: evoChainArr });
    }

    fetchPokemonData = async (number, pokemon, category, imageURL) => {
        try {
            const { data } = await BaseUrl.get(`/pokemon/${pokemon}`);
            const statistics = data.stats.map(stat => ({
                stat__name: stat.stat.name,
                stat__val: stat.base_stat
            }));

            this.setState({
                weight: data.weight,
                height: data.height,
                category,
                pokeNumber: data.id,
                imageURL,
                pokeName: pokemon,
                showInfo: true,
                stats: statistics,
                abilities: data.abilities.map(ab => ab.ability.name),
                evoChain: [],
                genderRate: "",
                genera: ""
            });

            this.fetchPokemonDescription(pokemon);
        } catch (error) {
            console.log("Error:", error);
        }
    }

    fetchPokemonDescription = async (pokemon_name) => {
        try {
            const { data } = await BaseUrl.get(`/pokemon-species/${pokemon_name}`);
            await this.fetchEvoDetails(data.evolution_chain.url);

            const description = data.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "Description not found";
            const genera = data.genera.find(genus => genus.language.name === "en")?.genus || "";

            this.setState({
                description,
                genderRate: data.gender_rate,
                genera,
            });
        } catch (error) {
            console.log("Error:", error);
            this.setState({ description: "Description not found" });
        }
    }

    handleChangeRegions = (event) => {
        const selectedRegion = this.state.regions.find(region => region.name === event.target.value);
        if (selectedRegion) {
            this.setState({
                valueregion: event.target.value,
                sorttype: "ID",
                isSearch: false,
                isFilter: false,
                showLoading: true,
            });
            this.getAllPokemons(selectedRegion.offset, selectedRegion.limit);
        }
    }

    handleChangeSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const isSearch = searchValue.length > 0;

        this.setState({ 
            isSearch, 
            valuesearch: searchValue,
            noDataFound: false 
        });

        const searchArr = this.state.allPokemons.filter(pokemon =>
            pokemon.name.includes(searchValue) || pokemon.id.toString().includes(searchValue)
        );

        this.setState({ 
            searchPokemons: searchArr,
            noDataFound: searchArr.length === 0 
        });
    }

    handleChangeSort = (event) => {
        const sortType = event.target.value;
        const sortedArr = (this.state.isFilter ? this.state.filterPokemons : this.state.allPokemons).slice();

        sortedArr.sort((a, b) => sortType === "ID" ? a.id - b.id : a.name.localeCompare(b.name));

        this.setState({
            [this.state.isFilter ? 'filterPokemons' : 'allPokemons']: sortedArr,
            sorttype: sortType
        });
    }

    handleChangeTypes = (event) => {
        const selectedType = event.target.value; 
        this.setState({ 
            valuetype: selectedType // Actualiza el estado con el tipo seleccionado
        });
        if (selectedType === "All types") {
            this.setState({
                isTypeSelected: false, 
                isFilter: false,
                selectedType: "", 
                filterPokemons: [], 
            });
        } else {
            const filterArr = this.state.allPokemons.filter(pokemon =>
                pokemon.types.some(type => type.type.name === selectedType)
            );

            this.setState({
            isTypeSelected: true,
            selectedType,
            filterPokemons: filterArr,
            isFilter: true
        });
        }
    }

    toggleDialog = () => {
        this.setState(prevState => ({ showInfo: !prevState.showInfo }));
    }

    handleClick = () => {
        window[`scrollTo`]({ top: document.body.scrollHeight, behavior: `smooth` })
    }

    closeDialog = () => {
        this.setState({ 
            showInfo: false,
            // Reinicia los valores relacionados con la info del Pokémon
            abilities: "",
            height: "",
            weight: "",
            category: "",
            pokeName: "",
            pokeNumber: "",
            description: "",
            stats: [],
            evoChain: []
        });
    }

    toggleFavorite = (pokemon) => {
        this.setState(prevState => {
            const isFavorite = prevState.favorites.includes(pokemon.id);
            const newFavorites = isFavorite
                ? prevState.favorites.filter(id => id !== pokemon.id) // Remove from favorites
                : [...prevState.favorites, pokemon.id]; // Add to favorites
            return { favorites: newFavorites };
        });
    }
    render() {
        const indexOfLastPokemon = this.state.currentPage * this.state.pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - this.state.pokemonsPerPage;
    
        const currentPokemons = this.state.isSearch
            ? this.state.searchPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
            : this.state.isFilter
            ? this.state.filterPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
            : this.state.favoritesFilter
            ? this.state.allPokemons.filter(pokemon => this.state.favorites.includes(pokemon.id)).slice(indexOfFirstPokemon, indexOfLastPokemon)
            : this.state.allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
        return (
        <>
            <Scroll showBelow={250} className="scroll__top" />
            {this.state.showLoading && <Loading />}
            {!this.state.showLoading && <div className="app__container">
                {this.state.showInfo &&
                <InfoDialog
                    open={this.state.showInfo}
                    abilities={this.state.abilities}
                    height={this.state.height}
                    weight={this.state.weight}
                    category={this.state.category}
                    genera={this.state.genera}
                    genderRate={this.state.genderRate}
                    stats={this.state.stats}
                    img={this.state.imageURL}
                    name={this.state.pokeName}
                    number={this.state.pokeNumber || 0}
                    description={this.state.description}
                    evoChain={this.state.evoChain}
                    cancel={() => this.closeDialog()}
                    evolutionPokemon={this.fetchPokemonData}>
                    <button onClick={this.closeDialog}></button>
                </InfoDialog>}
                

                {!this.state.showInfo && (
                    <>
                    
                        <Filters
                            valueregion={this.state.valueregion}
                            regions={this.state.regions}
                            valuetype={this.state.valuetype}
                            sorttype={this.state.sorttype}
                            valuesearch={this.state.valuesearch}
                            types={this.state.types}
                            sortby={this.state.sortby}
                            regionsSelect={this.handleChangeRegions}
                            typesSelect={this.handleChangeTypes}
                            sortSelect={this.handleChangeSort}
                            searchChange={this.handleChangeSearch}
                        />
                        <div className="pokemon__container">
                            <div className="all__pokemons">
                            <motion.ul
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    listStyleType: 'none',
                                    paddingInlineStart: '0px',
                                    marginBlockStart: '0px',
                                    marginBlockEnd: '0px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                initial="hidden"
                                animate="visible"
                                variants={list}>
                                {currentPokemons.map((item) => (
                                    <motion.li key={item.id} variants={items}>
                                        <Pokemon
                                            key={item.id}
                                            id={item.id}
                                            image={item.sprites.other.dream_world.front_default ? item.sprites.other.dream_world.front_default : item.sprites.other['official-artwork'].front_default}
                                            name={item.name}
                                            type={item.types}
                                            onElemClick={() => this.fetchPokemonData(item.id, item.name, item.types, item.sprites.other.dream_world.front_default ? item.sprites.other.dream_world.front_default : item.sprites.other['official-artwork'].front_default)}
                                        />
                                    </motion.li>
                                ))}
                            </motion.ul>
                            </div>
                        </div>
                        {this.state.noDataFound && <div className="no__data noselect">
                            No such Pokémon in this region :/</div>
                            }
                        <Pagination 
                            totalPokemons={this.state.isSearch ? this.state.searchPokemons.length : this.state.isFilter ? this.state.filterPokemons.length : this.state.allPokemons.length} 
                            pokemonsPerPage={this.state.pokemonsPerPage} 
                            paginate={page => this.setState({ currentPage: page })} 
                            currentPage={this.state.currentPage}
                        />
                        
                    </>
                )}
            </div>}
        </>
        );
    }
}
export default Home;