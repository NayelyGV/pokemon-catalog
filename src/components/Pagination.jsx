import React from 'react';
import '../styles/Pagination.css';

const Pagination = ({ totalPokemons, pokemonsPerPage, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalPokemons / pokemonsPerPage);
    const range = 1;

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const visiblePageNumbers = pageNumbers.filter(number => (
        (number >= currentPage - range && number <= currentPage + range) || 
        number === 1 || 
        number === totalPages
    ));

    return (
        <nav className="pagination">
            <ul>
                {currentPage > 1 && (
                    <li>
                        <button onClick={() => paginate(currentPage - 1)} className="prev-next"> &lt; </button>
                    </li>
                )}

                {visiblePageNumbers[0] !== 1 && (
                    <li>
                        <span className="dots">...</span>
                    </li>
                )}

                {visiblePageNumbers.map((number, index) => (
                    <li key={index}>
                        <button 
                            onClick={() => paginate(number)} 
                            className={number === currentPage ? 'active' : ''}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {visiblePageNumbers[visiblePageNumbers.length - 1] !== totalPages && (
                    <li>
                        <span className="dots">...</span>
                    </li>
                )}

                {currentPage < totalPages && (
                    <li>
                        <button onClick={() => paginate(currentPage + 1)} className="prev-next"> &gt; </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
