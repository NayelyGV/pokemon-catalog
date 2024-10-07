import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Pokedex from "../assets/images/pokeAPI.png";

class Header extends React.Component {

    changeTheme = () => {

        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = "light";

        if (currentTheme === "light") {
            targetTheme = "dark";

            this.setState({
                isChecked: true,
            })

        } else {
            this.setState({
                isChecked: false,
            })
        }
        document.documentElement.setAttribute('data-theme', targetTheme)
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
                                <i className="fas fa-sun"></i>
                                <i className="fas fa-moon"></i>
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