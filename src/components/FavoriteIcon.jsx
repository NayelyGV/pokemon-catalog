import React from 'react';

const handleFavoriteToggle = (number, img, name, category, setIsFavorite) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isInFavorites = favorites.some(p => p.id === number);

    if (isInFavorites) {
        const updatedFavorites = favorites.filter(p => p.id !== number);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(false);
    } else {
        const newFavorite = { id: number, image: img, name, types: category };
        favorites.push(newFavorite);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(true);
    }
};

const FavoriteIcon = ({ isFavorite, onClick }) => (
    <svg
        stroke={isFavorite ? "red" : "black"} // Cambia el color del trazo
        fill={isFavorite ? "red" : "none"} // Relleno rojo si es favorito, vacío si no
        strokeWidth="2" // Grosor del trazo
        viewBox="0 0 24 24"
        height="2em"
        width="2em"
        onClick={onClick}
        style={{ cursor: 'pointer' }} // Cambia el cursor al pasar el mouse
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
    </svg>
);

export default FavoriteIcon;
