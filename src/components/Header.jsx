import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Pokedex from "../assets/images/pokeAPI.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';


class Header extends React.Component {
    constructor(props) {
        super(props);
        // Inicializa el estado con isChecked dependiendo del tema actual
        const initialTheme = document.documentElement.getAttribute('data-theme') || 'dark'; // Si no hay tema, por defecto es 'light'
        document.documentElement.setAttribute('data-theme', initialTheme); // Asegurarse de que el tema inicial se establece
        this.state = {
            isChecked: initialTheme === 'dark' // Comprobar el tema actual al inicio
        };
    }
    changeTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const targetTheme = currentTheme === "light" ? "dark" : "light";
        
        // Actualiza el estado y el atributo del tema
        this.setState({
            isChecked: targetTheme === "dark" // Actualiza el estado según el nuevo tema
        });

        document.documentElement.setAttribute('data-theme', targetTheme);
    }

    openGithub = () => {
        window.open("https://github.com/NayelyGV/pokemon-catalog");
    }

    render() {
        return (
            <>
                <div className="app__header">
                    <div className="switch">

                        <div className="toggle">
                            <label htmlFor="themeSwitch"></label>
                            <input type="checkbox" name="swich-theme" id="themeSwitch" onClick={this.changeTheme} defaultChecked />
                            <div className="toggle-bg"></div>
                            <div className="toggle-thumb">
                                <FontAwesomeIcon icon={faSun} />
                                <FontAwesomeIcon icon={faMoon} />
                            </div>
                        </div>
                    </div>
                    <div className="poke__logos noselect">
                        <img src={Pokedex} alt="pokelogo" className="poke__logo" />
                    </div>
                    <div className="pokeball__box github__icon" onClick={this.openGithub}>
                        <GitHubIcon></GitHubIcon>
                    </div>
                </div>
            </>
        )
    }
}

export default Header;