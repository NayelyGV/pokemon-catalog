import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Pokedex from "../assets/images/pokeAPI.png";
import '../styles/footer.css'

class Footer extends React.Component {
  openLink = (url) => {
    window.open(url),'_blank', 'noopener,noreferrer';
  }

  render() {
    const socialLinks = [
      {
        url: "https://facebook.com",
        icon: <FacebookIcon />,
        label: "Facebook"
      },
      {
        url: "https://instagram.com",
        icon: <InstagramIcon />,
        label: "Instagram"
      },
      {
        url: "https://www.linkedin.com/in/nayely-giles-valdez-74b034163/",
        icon: <LinkedInIcon />,
        label: "LinkedIn"
      },
      {
        url: "https://github.com/NayelyGV/pokemon-catalog",
        icon: <GitHubIcon />,
        label: "GitHub"
      }
    ];

    return (
      <footer className="app__footer noselect">
        <div className="footer__content">
          <div className="footer__column">
            <img 
              src={Pokedex}
              alt="Logo de Pokémon Catalog" 
              className="footer__logo" 
            />
            <p className="footer__text">© 2024 Pokémon Catalog </p>
            <div className="social__icons">
              {socialLinks.map(({ url, icon, label }) => (
                <button 
                  key={label} 
                  onClick={() => this.openLink(url)} 
                  className="social__icon"
                  aria-label={label}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
          
          <div className="footer__column"></div>
          <div className="footer__column"></div>
        </div>
      </footer>
    );
  }
}

export default Footer;