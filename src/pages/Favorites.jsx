import React from 'react';
import Pokemon from "../components/Pokemon";
import BaseUrl from '../services/BaseURL';
import Loading from '../components/Loading';

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favoritePokemons: [],
            showLoading: true,
        };
    }

    componentDidMount() {
        this.loadFavorites();
    }

    loadFavorites = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.setState({ favoritePokemons: favorites, showLoading: false });
    };

    render() {
        const { favoritePokemons, showLoading } = this.state;

        if (showLoading) {
            return <Loading />;
        }

        return (
            <div className="favorites__container">
                <h2>Favoritos</h2>
                <div className="pokemon__container">
                    {favoritePokemons.length > 0 ? (
                        favoritePokemons.map(pokemon => (
                            <Pokemon
                                key={pokemon.id}
                                id={pokemon.id}
                                image={pokemon.image} // Asegúrate de que la propiedad sea correcta
                                name={pokemon.name}
                                type={pokemon.types || []} // Asegúrate de que la propiedad sea correcta
                                // Si necesitas manejar clics, puedes pasarlo aquí
                            />
                        ))
                    ) : (
                        <p>No tienes Pokémon favoritos.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default Favorites;