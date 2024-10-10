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

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritePokemonData: [],
            showLoading: true,
            showInfo: false,
            selectedPokemon: null,
            currentPage: 1,
            pokemonsPerPage: 8,
            selectedType: 'All types',
            selectedRegion: 'All regions',
            selectedSort: 'ID',
            searchQuery: '',
            noDataFound: false,
            types: [
                "All types", "grass", "bug", "dark", "dragon", "electric", "fairy", 
                "fighting", "fire", "flying", "ghost", "ground", "ice", "normal", 
                "poison", "psychic", "rock", "steel", "water"
            ],
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
            sortOptions: ["ID", "Name"],
        };
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (storedFavorites.length === 0) {
            this.setState({ showLoading: false, noDataFound: true });
        } else {
            this.fetchFavoritePokemons(storedFavorites.map(fav => fav.id));
        }
    };

    fetchFavoritePokemons = (favoriteIds) => {
        const promises = favoriteIds.map(favoriteId => {
            console.log(`Fetching Pokémon data from: /pokemon/${favoriteId}`); // Log URL
            return BaseUrl.get(`/pokemon/${favoriteId}`)
                .then(response => response.data)
                .catch(error => {
                    console.error('Error fetching Pokémon:', error);
                    return null; // Return null if there's an error
                });
        });

        Promise.all(promises)
            .then(data => {
                const validData = data.filter(pokemon => pokemon !== null);
                this.setState({
                    favoritePokemonData: validData,
                    showLoading: false,
                    noDataFound: validData.length === 0,
                });
            })
            .catch(error => {
                console.error('Error fetching favorite Pokémon:', error);
                this.setState({ showLoading: false });
            });
    };

    fetchPokemonData = (pokemon) => {
        this.setState({
            selectedPokemon: pokemon,
            showInfo: true,
        });
    };

    toggleDialog = () => {
        this.setState(prevState => ({
            showInfo: !prevState.showInfo,
            selectedPokemon: null,
        }));    
    };

    filterPokemonsByType = (type) => {
        this.setState({ selectedType: type, currentPage: 1 });
    };

    filterPokemonsByRegion = (region) => {
        this.setState({ selectedRegion: region, currentPage: 1 });
    };

    sortPokemons = (sortOption) => {
        this.setState({ selectedSort: sortOption, currentPage: 1 });
    };

    handleSearchChange = (event) => {
        this.setState({ searchQuery: event.target.value, currentPage: 1 });
    };

    paginate = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
    };

    render() {
        const { 
            favoritePokemonData, 
            showLoading, 
            showInfo, 
            selectedPokemon, 
            currentPage, 
            pokemonsPerPage, 
            selectedType, 
            selectedRegion, 
            selectedSort, 
            searchQuery, 
            noDataFound 
        } = this.state;

        // Filter Pokémon based on selected type
        const filteredPokemons = selectedType === 'All types'
            ? favoritePokemonData
            : favoritePokemonData.filter(pokemon => 
                pokemon.types && pokemon.types.some(t => t.type.name === selectedType)
            );

        // Filter Pokémon based on selected region
        const regionFilteredPokemons = selectedRegion === 'All regions'
            ? filteredPokemons
            : filteredPokemons.filter(pokemon => {
                return this.getRegionFromId(pokemon.id) === selectedRegion; 
            });

        // Filter Pokémon based on search query
        const searchedPokemons = regionFilteredPokemons.filter(pokemon =>
            pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        // Sort Pokémon
        const sortedPokemons = [...searchedPokemons].sort((a, b) => {
            if (selectedSort === 'Name') {
                return a.name.localeCompare(b.name);
            }
            return a.id - b.id; // Default sort by ID
        });

        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

        // Determine the current Pokémon list based on search, filter, or favorites
        const currentPokemons = searchedPokemons.length > 0 
            ? sortedPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)
            : filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
        
        if (showLoading) {
            return <Loading />;
        }

        return (
            <div className="favorites__container">
                <Scroll showBelow={250} />

                <div className="filters">
                    <Filters 
                        selectedType={selectedType}
                        types={this.state.types}
                        regions={this.state.regions}
                        sortOptions={this.state.sortOptions}
                        filterPokemonsByType={this.filterPokemonsByType}
                        filterPokemonsByRegion={this.filterPokemonsByRegion}
                        sortPokemons={this.sortPokemons}
                        onSearchChange={this.handleSearchChange}
                    />
                </div>

                <div className="pokemon__container">
                    {currentPokemons.length > 0 ? (
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
                            {currentPokemons.map(pokemon => (
                                <motion.li key={pokemon.id} variants={items}>
                                    <Pokemon
                                        id={pokemon.id}
                                        image={pokemon.sprites.other.dream_world.front_default}
                                        name={pokemon.name}
                                        type={pokemon.types}
                                        onElemClick={() => this.fetchPokemonData(pokemon)}
                                    />
                                </motion.li>
                            ))}
                        </motion.ul>
                    ) : (
                        noDataFound && <p>No tienes Pokémon favoritos.</p>
                    )}
                </div>

                {showInfo && selectedPokemon && (
                    <InfoDialog
                        open={showInfo}
                        img={selectedPokemon.sprites.other.dream_world.front_default}
                        name={selectedPokemon.name}
                        number={selectedPokemon.id}
                        cancel={this.toggleDialog}
                    />
                )}
                
                <Pagination
                    totalPokemons={sortedPokemons.length}
                    pokemonsPerPage={pokemonsPerPage}
                    paginate={this.paginate}
                    currentPage={currentPage}
                />
            </div>
        );
    }
}

export default Favorites;
