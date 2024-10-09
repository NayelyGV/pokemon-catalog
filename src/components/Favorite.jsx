import React from 'react';
import Pokemon from "./Pokemon"; // Asegúrate de tener la ruta correcta

const Favorite = ({ favorite, toggleFavorite }) => {
    return (
        <div className="favorite">
            <h2>Favoritos</h2>
            <div className="favorite__container">
                {favorites.length > 0 ? (
                    favorites.map((fav) => (
                        <Pokemon
                            key={fav.id}
                            id={fav.id}
                            image={fav.sprites.other.dream_world.front_default ? fav.sprites.other.dream_world.front_default : fav.sprites.other['official-artwork'].front_default}
                            name={fav.name}
                            type={fav.types}
                            onElemClick={() => { /* Aquí puedes agregar lógica para mostrar más info si lo deseas */ }}
                            onFavoriteClick={() => toggleFavorite(fav)} // Manejador de favoritos
                        />
                    ))
                ) : (
                    <p>No hay Pokémon favoritos.</p>
                )}
            </div>
        </div>
    );
};

export default Favorite;
