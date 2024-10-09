import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import Pokedex from "../assets/images/pokeAPI.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';
import '../styles/Header.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isChecked, setIsChecked] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    useEffect(() => {
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'light';
        document.documentElement.setAttribute('data-theme', initialTheme);
        setIsChecked(initialTheme === 'dark');
    }, []);

    const changeTheme = () => {
        const newTheme = isChecked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        setIsChecked(!isChecked);
    };

    const openGithub = () => {
        window.open("https://github.com/NayelyGV/pokemon-catalog", '_blank');
    };

    const goToPage = (path) => {
        if (location.pathname !== path) {
            navigate(path);
        }
    };

    return (
        <div className="app__header">
            <div className="header__column header__left">
                {/* Menu */}
                <div className="menu__toggle" onClick={() => setNavbarOpen(!navbarOpen)}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                {/* Logo */}
                <img src={Pokedex} alt="pokelogo" className="poke__logo" />
            </div>
            <div className="header__column header__right">
                {/* Botones */}
                <div className="header__buttons">
                    {['/', '/favorites'].map((path) => (
                        <button
                            key={path}
                            className={`header__button ${location.pathname === path ? 'active' : ''}`}
                            onClick={() => goToPage(path)}
                        >
                            {path === '/' ? 'Home' : 'Favorites'}
                        </button>
                    ))}
                </div>
                {/* GitHub */}
                <div className="pokeball__box github__icon" onClick={openGithub}>
                    <GitHubIcon />
                </div>
                {/* 
                <ThemeToggle isChecked={isChecked} onChange={changeTheme} />
                */}
            </div>
            {/* Navbar */}
            {navbarOpen && (
                <div className="navbar active">
                    <div className="navbar__item" onClick={() => goToPage('/')}>Home</div>
                    <div className="navbar__item" onClick={() => goToPage('/favorites')}>Favoritos</div>
                    {/*  Interruptor
                    <div className="navbar__item">
                        <ThemeToggle isChecked={isChecked} onChange={changeTheme} />
                    </div>*/}
                </div>
            )}
        </div>
    );
};

export default Header;
