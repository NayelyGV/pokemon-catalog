import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';
{ /*import PokemonCard from './components/PokemonCard';*/  }
import InfoDialog from './components/InfoDialog';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} /> { /* La página de inicio se cargará en http://localhost:5173/ */  }
                <Route path="/favorites" element={<Favorites  />} /> { /* La página de inicio se cargará en http://localhost:5173/favorites */  }
                <Route path="/details" element={<InfoDialog  />} /> { /* La página de inicio se cargará en http://localhost:5173/favorites */  }
                { /*<Route path="/detail" element={<PokemonCard  />} /> { /* La página de inicio se cargará en http://localhost:5173/detail */  }
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
