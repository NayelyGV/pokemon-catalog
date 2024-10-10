import React from 'react';

class Filters extends React.Component {
    openGithub = () => {
        window.open("https://github.com/NayelyGV/pokemon-catalog");
    }

    render() {
        const {
            valueregion = '',
            regions = [],
            regionsSelect,
            valuetype = '',
            types = [],
            typesSelect,
            sorttype = '',
            sortby = [],
            sortSelect,
            valuesearch = '',
            searchChange
        } = this.props;

        return (
            <div className="filter__container noselect">
                <div className="filter__items">
                    <div>Region</div>
                    <select value={valueregion} onChange={regionsSelect}>
                        {regions.map(region => (
                            <option key={region.name} value={region.name}>
                                {region.name}&nbsp;({region.offset + 1}-{region.limit + region.offset})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="filter__items">
                    <div>Type</div>
                    <select value={valuetype} onChange={typesSelect}>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="filter__items">
                    <div>Sort by</div>
                    <select value={sorttype} onChange={sortSelect}>
                        {sortby.map(sort => (
                            <option key={sort} value={sort}>{sort}</option>
                        ))}
                    </select>
                </div>
                <div className="filter__items">
                    <label>Search</label>
                    <input 
                        type="text" 
                        value={valuesearch} 
                        onChange={searchChange} 
                    />
                </div>
            </div>
        );
    }
}

export default Filters;
