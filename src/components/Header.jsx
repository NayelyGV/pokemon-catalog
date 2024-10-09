import React, { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import Pokedex from "../assets/images/pokeAPI.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Estado para tema y menú móvil
    const [isChecked, setIsChecked] = useState(document.documentElement.getAttribute('data-theme') === 'dark');
    const [menuOpen, setMenuOpen] = useState(false);

    // Efecto para aplicar el tema al montar el componente
    useEffect(() => {
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', initialTheme);
    }, []);

    const changeTheme = () => {
        const newTheme = isChecked ? 'light' : 'dark'; // Cambia el valor según el estado actual
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsChecked(!isChecked); // Cambia el estado
    };

    const openGithub = () => {
        window.open("https://github.com/NayelyGV/pokemon-catalog", '_blank');
    };

    const goToHome = () => {
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    const goToFavorites = () => {
        if (location.pathname !== '/favorites') {
            navigate('/favorites');
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="app__header">
            {/* Icono de menú para móvil */}
            <div className="menu__toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            
            {/* Logo */}
            <div className="poke__logos noselect">
                <img src={Pokedex} alt="pokelogo" className="poke__logo" />
            </div>

            {/* Botones para escritorio */}
            <div className="header__buttons">
                <button
                    className={`header__button ${location.pathname === '/' ? 'active' : ''}`}
                    onClick={goToHome}
                >
                    Home
                </button>
                <button
                    className={`header__button ${location.pathname === '/favorites' ? 'active' : ''}`}
                    onClick={goToFavorites}
                >
                    Favorites
                </button>
            </div>

            {/* Icono GitHub */}
            <div className="pokeball__box github__icon" onClick={openGithub}>
                <GitHubIcon />
            </div>

            {/* Dia/Noche */}
            <div className="switch">
                <div className="toggle">
                    <label htmlFor="themeSwitch"></label>
                    <input type="checkbox" id="themeSwitch" onClick={changeTheme} defaultChecked={isChecked} />
                    <div className="toggle-bg"></div>
                    <div className="toggle-thumb">
                        <FontAwesomeIcon icon={faSun} />
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                </div>
            </div>
                
            {/* Menú móvil */}
            <div className={`menu ${menuOpen ? 'active' : ''}`}>
                <div className="menu__item" onClick={goToHome}>Home</div>
                <div className="menu__item" onClick={goToFavorites}>Favorites</div>
                <div className="menu__item">
                    <div className="switch">
                        <div className="toggle">
                            <label htmlFor="themeSwitch"></label>
                            <input type="checkbox" id="themeSwitch" onClick={changeTheme} defaultChecked={isChecked} />
                            <div className="toggle-bg"></div>
                            <div className="toggle-thumb">
                                <FontAwesomeIcon icon={faSun} />
                                <FontAwesomeIcon icon={faMoon} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;