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

class PokemonCard extends React.Component {
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
            category: "",
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
            currentPage: 1,
            pokemonsPerPage: 8,
            favorites: [],
        };
    }

    componentDidMount() {
        this.getAllPokemons(this.state.offset, this.state.limit);
    }

    // Obtiene todos los Pokémon
    getAllPokemons = async (offset, limit) => {
        try {
            const response = await BaseUrl.get(`/pokemon?limit=${limit}&offset=${offset}`);
            this.getPokemonData(response.data.results);
        } catch (error) {
            console.error("Error:", error);
            this.setState({ showLoading: false });
        }
    }

    // Procesa la data de los Pokémon
    getPokemonData = async (result) => {
        const pokemonArr = await Promise.all(result.map(async (pokemonItem) => {
            const { data } = await BaseUrl.get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`);
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

    fetchPokemonData = async (number, pokemon) => {
        try {
            const { data } = await BaseUrl.get(`/pokemon/${pokemon}`);
            const statistics = data.stats.map(stat => ({
                stat__name: stat.stat.name,
                stat__val: stat.base_stat
            }));

            this.setState({
                weight: data.weight,
                height: data.height,
                category: data.types[0].type.name,
                pokeNumber: data.id,
                imageURL: data.sprites.other.dream_world.front_default,
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

    handleChangeTypes = (event) => {
        const selectedType = event.target.value;
        this.setState({ 
            isTypeSelected: selectedType !== "All types", 
            selectedType 
        });
        
        const filterArr = this.state.allPokemons.filter(pokemon =>
            pokemon.types.some(type => type.type.name === selectedType)
        );

        this.setState({
            filterPokemons: filterArr,
            isFilter: selectedType !== "All types"
        });
    }

    toggleDialog = () => {
        this.setState(prevState => ({ showInfo: !prevState.showInfo }));
    }

    toggleFavorite = (pokemon) => {
        this.setState(prevState => {
            const isFavorite = prevState.favorites.includes(pokemon.id);
            const newFavorites = isFavorite
                ? prevState.favorites.filter(id => id !== pokemon.id)
                : [...prevState.favorites, pokemon.id];
            return { favorites: newFavorites };
        });
    }

    render() {
        const indexOfLastPokemon = this.state.currentPage * this.state.pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - this.state.pokemonsPerPage;

        const currentPokemons = this.props.showFavorites 
            ? this.state.allPokemons.filter(pokemon => this.state.favorites.includes(pokemon.id)) 
            : this.state.allPokemons;

        const paginatedPokemons = currentPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

        return (
            <>
                <Scroll showBelow={250} />
                {this.state.showLoading && <Loading />}
                {!this.state.showLoading && (
                    <div className="app__container">
                        {this.state.showInfo && (
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
                                cancel={this.closeDialog}
                            />
                        )}

                        {!this.state.showInfo && (
                            <>
                                <Filters
                                    regions={this.props.regions}
                                    types={this.props.types}
                                    sortby={this.props.sortby}
                                    onChangeTypes={this.handleChangeTypes}
                                    onChangeSearch={this.props.onChangeSearch}
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
                                            variants={list}
                                        >
                                            {paginatedPokemons.map((item) => (
                                                <motion.li key={item.id} variants={items}>
                                                    <Pokemon
                                                        key={item.id}
                                                        id={item.id}
                                                        image={item.sprites.other.dream_world.front_default || item.sprites.other['official-artwork'].front_default}
                                                        name={item.name}
                                                        type={item.types}
                                                        onElemClick={() => this.fetchPokemonData(item.id, item.name)}
                                                        toggleFavorite={() => this.toggleFavorite(item)}
                                                        isFavorite={this.state.favorites.includes(item.id)}
                                                    />
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    </div>
                                </div>
                                {this.state.noDataFound && <div className="no__data noselect">
                                    No such Pokémon found :/</div>
                                }
                                <Pagination 
                                    totalPokemons={currentPokemons.length} 
                                    pokemonsPerPage={this.state.pokemonsPerPage} 
                                    paginate={page => this.setState({ currentPage: page })} 
                                    currentPage={this.state.currentPage}
                                />
                            </>
                        )}
                    </div>
                )}
            </>
        );
    }
}

export default PokemonCard;
