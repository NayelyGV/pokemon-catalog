import React from 'react';
import Pokemon from "../components/Pokemon";
import BaseUrl from '../services/BaseURL';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import InfoDialog from '../components/InfoDialog';
import Scroll from '../components/Scroll';

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
        };
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (storedFavorites.length === 0) {
            this.setState({ showLoading: false });
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
                });
            })
            .catch(error => {
                console.error('Error al obtener Pokémon favoritos:', error);
                this.setState({ showLoading: false });
            });
    };

    // Resto de métodos...

    render() {
        const { favoritePokemonData, showLoading, showInfo, selectedPokemon, currentPage, pokemonsPerPage } = this.state;

        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
        const currentPokemons = favoritePokemonData.slice(indexOfFirstPokemon, indexOfLastPokemon);

        if (showLoading) {
            return <Loading />;
        }

        return (
            <div className="favorites__container">
                <Scroll showBelow={250} />
                <div className="pokemon__container">
                    {currentPokemons.length > 0 ? (
                        currentPokemons.map(pokemon => (
                            <Pokemon
                                key={pokemon.id}
                                id={pokemon.id}
                                image={pokemon.sprites.other.dream_world.front_default}
                                name={pokemon.name}
                                type={pokemon.types}
                                onElemClick={() => this.fetchPokemonData(pokemon)} // Asegúrate de tener este método
                            />
                        ))
                    ) : (
                        <p>No tienes Pokémon favoritos.</p>
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
                    totalPokemons={favoritePokemonData.length}
                    pokemonsPerPage={pokemonsPerPage}
                    paginate={this.paginate}
                    currentPage={currentPage}
                />
            </div>
        );
    }
}

export default Favorites;
