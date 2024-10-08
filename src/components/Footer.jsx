import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Pokedex from "../assets/images/pokeAPI.png";
import '../styles/footer.css'

class Footer extends React.Component {
  openLink = (url) => {
    window.open(url);
  }

  render() {
    return (
      <footer className="app__footer noselect">
        <div className="footer__content">
          <img 
            src={Pokedex}
            alt="Logo" 
            className="footer__logo" 
          />
          <p className="footer__text">© 2024 Pokémon Catalog </p>
          <div className="social__icons">
            <div onClick={() => this.openLink("https://github.com/NayelyGV/pokemon-catalog")} className="social__icon">
              <GitHubIcon />
            </div>
            <div onClick={() => this.openLink("https://www.linkedin.com/in/nayely-giles-valdez-74b034163/")} className="social__icon">
              <LinkedInIcon />
            </div>
            <div onClick={() => this.openLink("https://facebook.com")} className="social__icon">
              <FacebookIcon />
            </div>
            <div onClick={() => this.openLink("https://instagram.com")} className="social__icon">
              <InstagramIcon />
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;