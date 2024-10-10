import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {


    return (
        
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home  />} /> 
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
