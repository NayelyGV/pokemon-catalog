import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Pokedex from "../assets/images/pokeAPI.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', initialTheme);
        this.state = {
            isChecked: initialTheme === 'dark',
            menuOpen: false, 
            currentPage: window.location.pathname,
        };
    }

    changeTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === "light" ? "dark" : "light";
        
        this.setState({ isChecked: targetTheme === "dark" });
        document.documentElement.setAttribute('data-theme', targetTheme);
    }

    openGithub = () => {
        window.open("https://github.com/NayelyGV/pokemon-catalog");
    }

    goToHome = () => {
        this.setState({ currentPage: '/' });
        window.location.href = '/';
    }

    goToFavorites = () => {
        this.setState({ currentPage: '/favorites' });
        window.location.href = '/favorites'; 
    }

    toggleMenu = () => {
        this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));
    }

    render() {
        return (
            <div className="app__header">
                {/* Logo */}
                <div className="poke__logos noselect">
                    <img src={Pokedex} alt="pokelogo" className="poke__logo" />
                </div>

                {/* Botones para escritorio */}
                <div className="header__buttons">
                    <button
                        className={`header__button ${this.state.currentPage === '/' ? 'active' : ''}`}
                        onClick={this.goToHome}
                    >
                        Home
                    </button>
                    <button
                        className={`header__button ${this.state.currentPage === '/favorites' ? 'active' : ''}`}
                        onClick={this.goToFavorites}
                    >
                        Favorites
                    </button>
                </div>

                {/* Icono GitHub */}
                <div className="pokeball__box github__icon" onClick={this.openGithub}>
                    <GitHubIcon />
                </div>

                {/* Dia/Noche */}
                <div className="switch">
                    <div className="toggle">
                        <label htmlFor="themeSwitch"></label>
                        <input type="checkbox" id="themeSwitch" onClick={this.changeTheme} defaultChecked={this.state.isChecked} />
                        <div className="toggle-bg"></div>
                        <div className="toggle-thumb">
                            <FontAwesomeIcon icon={faSun} />
                            <FontAwesomeIcon icon={faMoon} />
                        </div>
                    </div>
                </div>

                {/* Icono de menú para móvil */}
                <div className="menu__toggle" onClick={this.toggleMenu}>
                    <i className="fas fa-bars"></i>
                </div>

                {/* Menú móvil */}
                <div className={`menu ${this.state.menuOpen ? 'active' : ''}`}>
                    <div className="menu__item" onClick={this.goToHome}>Home</div>
                    <div className="menu__item" onClick={this.goToFavorites}>Favorites</div>
                    <div className="menu__item" onClick={this.openGithub}>GitHub</div>
                    <div className="menu__item">
                        <div className="switch">
                            <div className="toggle">
                                <label htmlFor="themeSwitch"></label>
                                <input type="checkbox" id="themeSwitch" onClick={this.changeTheme} defaultChecked={this.state.isChecked} />
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
    }
}

export default Header;
