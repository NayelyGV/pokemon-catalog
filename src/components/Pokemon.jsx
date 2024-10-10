import React, { useState } from 'react'
import '../styles/Pokemon.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';

export const capitalizeFirstLetter = (string) => {
    if (typeof string !== 'string' || string.length === 0) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const Pokemon = ({ id, image, name, type, onElemClick }) => {
    const [isFavorite, setIsFavorite] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.some(p => p.id === id);
    });

    let finalColor;

    // Asegúrate de que type es un arreglo
    const pokemonType = Array.isArray(type) && type.length ? type : [{ type: { name: 'normal' } }]; // Usar 'normal' como tipo por defecto

    if (pokemonType.length === 2) {
        finalColor = colorTypeGradients(pokemonType[0].type.name, pokemonType[1].type.name, pokemonType.length);
    } else {
        finalColor = colorTypeGradients(pokemonType[0].type.name, pokemonType[0].type.name, pokemonType.length);
    }

    // Función para alternar el estado de favorito y guardar en localStorage
    const handleFavoriteToggle = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(p => p.id === id);

        if (isFavorite) {
            const updatedFavorites = favorites.filter(p => p.id !== id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            setIsFavorite(false); // Actualizar el estado
        } else {
            const newFavorite = { id, image, name, types: type };
            favorites.push(newFavorite);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            setIsFavorite(true); // Actualizar el estado
        }
    };
   

    return (
        <div className="thumbnail__container noselect" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
            <div className="card__header">
                <div className="poke__number">
                    #{String(id).padStart(3, '0')}
                </div>
                <div className="info__icon" onClick={() => onElemClick({ name })}>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
                    </svg>
                </div>
                <div className="favorite__icon" onClick={handleFavoriteToggle}>
                    <svg
                        stroke="currentColor"
                        fill={isFavorite ? "red" : "none"}
                        strokeWidth="1"
                        viewBox="1 1 24 24"
                        height="2em"
                        width="2em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                    </svg>
                </div>
            </div>

            <div className="image__container">
                <LazyLoadImage
                    alt="image-pokemon"
                    height={150}
                    src={image}
                    visibleByDefault={false}
                    delayMethod={'debounce'}
                    effect="blur"
                    className="img__thumbnail"
                />
            </div>
            <div className="poke__name">
                <h3>{capitalizeFirstLetter(name)}</h3>
                <div className="poke__type">
                    {type.map((type) => (
                        <Tooltip TransitionComponent={Zoom} key={type.type.name} title={type.type.name} arrow>
                            <div className={`poke__type__bg ${type.type.name}`}>
                                <img src={`${type.type.name}.svg`} alt="poke-type" />
                            </div>
                        </Tooltip>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pokemon;