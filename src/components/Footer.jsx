import React from 'react';
import '../styles/footer.css';

class Footer extends React.Component {
  render() {
    return (
      <div className="app__footer noselect">
        <div>
          Built using <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">PokéAPI</a>, <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a> and <a href="https://material-ui.com/" target="_blank" rel="noopener noreferrer">Material-UI</a>.
        </div>
      </div>
    );
  }
}

export default Footer;