import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ totalPokemons, pokemonsPerPage, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
    const range = 1;

    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    const visiblePageNumbers = pageNumbers.filter(number => (
        number === 1 ||
        number === totalPages || 
        (number >= currentPage - range && number <= currentPage + range) 
    ));

    return (
        <nav className="pagination">
            <ul>
                {currentPage > 1 && (
                    <li>
                        <button onClick={() => paginate(currentPage - 1)}>Anterior</button>
                    </li>
                )}
                {visiblePageNumbers.map(number => (
                    <li key={number}>
                        <button 
                            onClick={() => paginate(number)} 
                            className={number === currentPage ? 'active' : ''}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li>
                        <button onClick={() => paginate(currentPage + 1)}>Siguiente</button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;