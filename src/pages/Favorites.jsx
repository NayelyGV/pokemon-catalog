import React from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import InfoDialog from '../components/InfoDialog';
import Footer from '../components/Footer';

function Favorites() {
    return (
        <div>
            <Filters />
            <InfoDialog />
        </div>
    );
}

export default Favorites;