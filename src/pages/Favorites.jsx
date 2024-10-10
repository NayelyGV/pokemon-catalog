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
            selectedType: 'All types', // Tipo por defecto
            noDataFound: false, // Estado para mostrar mensaje de no datos
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
            this.fetchFavoritePokemons(storedFavorites.map(fav => fav.id)); // Solo IDs
        }
    };

    fetchFavoritePokemons = (favoriteIds) => {
        const promises = favoriteIds.map(favoriteId => {
            return BaseUrl.get(`/pokemon/${favoriteId}`)
                .then(response => response.data)
                .catch(error => {
                    console.error('Error al obtener Pokémon:', error);
                    return null; // Retorna null si hay un error
                });
        });

        Promise.all(promises)
            .then(data => {
                const validData = data.filter(pokemon => pokemon !== null);
                this.setState({
                    favoritePokemonData: validData,
                    showLoading: false,
                    noDataFound: validData.length === 0, // Actualiza el estado de noDataFound
                });
            })
            .catch(error => {
                console.error('Error al obtener Pokémon favoritos:', error);
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
            noDataFound 
        } = this.state;

        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

        const filteredPokemons = selectedType === 'All types'
            ? favoritePokemonData
            : favoritePokemonData.filter(pokemon => 
                pokemon.types && pokemon.types.some(t => t.type.name === selectedType)
            );

        const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
        
        if (showLoading) {
            return <Loading />;
        }

        return (
            <div className="favorites__container">
                <Scroll showBelow={250} />

                <div className="filters">
                    <Filters 
                        selectedType={selectedType}
                        filterPokemonsByType={this.filterPokemonsByType}
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
                                        key={pokemon.id}
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
                    totalPokemons={filteredPokemons.length}
                    pokemonsPerPage={pokemonsPerPage}
                    paginate={this.paginate}
                    currentPage={currentPage}
                />
            </div>
        );
    }
}

export default Favorites;
