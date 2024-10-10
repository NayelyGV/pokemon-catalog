import React from 'react';
import PropTypes from 'prop-types';
import '../styles/InfoDialog.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Delayed from './Delayed';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// Función para obtener la tasa de género
const fetchGenderRate = (genderRate) => {
    if (genderRate < 0 || genderRate > 8) {
        return <span>Gender rate out of bounds</span>;
    }

    const genderRates = [
        <div><span className="gender-male">100% <i className="fa fa-mars"></i></span><span> 0% <i className="fa fa-venus"></i></span></div>,
        <div><span>87.5% <i className="fa fa-mars"></i></span><span> 12.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>75% <i className="fa fa-mars"></i></span><span> 25% <i className="fa fa-venus"></i></span></div>,
        <div><span>62.5% <i className="fa fa-mars"></i></span><span> 37.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>50% <i className="fa fa-mars"></i></span><span> 50% <i className="fa fa-venus"></i></span></div>,
        <div><span>37.5% <i className="fa fa-mars"></i></span><span> 62.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>25% <i className="fa fa-mars"></i></span><span> 75% <i className="fa fa-venus"></i></span></div>,
        <div><span>12.5% <i className="fa fa-mars"></i></span><span> 87.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>0% <i className="fa fa-mars"></i></span><span> 100% <i className="fa fa-venus"></i></span></div>,
    ];

    return genderRates[genderRate] || <span>Loading...</span>;
};

const InfoDialog = (props) => {
    // Verifica si las props son válidas
    if (!props.category || props.category.length === 0) {
        return <div>No data available</div>;
    }

    const finalColor = props.category.length === 2
        ? colorTypeGradients(props.category[0].type.name, props.category[1].type.name, 2)
        : colorTypeGradients(props.category[0].type.name, props.category[0].type.name, 1);

    return (
        <div className="info-dialog-container">
            <div className="info__container" >
                <div className="info__container__img" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                    <div className="info__container__img__header">
                        <div className="info__container__button">
                            <ArrowBackIcon onClick={props.cancel} />
                        </div>
                        <div className="pokemon__id">#{String(props.number).padStart(3, '0')}</div>
                    </div>
                    
                    <img src={props.img} alt="poke-img" />
                    <div className="info__container__data__type">
                            {props.category.map((category) => (
                                <Tooltip TransitionComponent={Zoom} key={category.type.name} title={category.type.name} arrow>
                                    <div className={`poke__type__bg ${category.type.name}`}>
                                        <img src={`${category.type.name}.svg`} alt="poke-type" />
                                    </div>
                                </Tooltip>
                            ))}
                    </div>
                </div>

                <div className="info__container__data">
                    <div className="right__box">
                        {/* Sección Name */}
                        <div className="info__container__header__name">
                            <div className="info__container__title">
                                <div className="pokemon__name">{props.name}</div>
                                <div className="pokemon__genera" style={{ background: finalColor[0] }}>{props.genera}</div>
                            </div>
                            <div className='info_container_favorite'>F</div>
                        </div>

                        {/* Sección About */}
                        <div className="about__section">
                            <div className="info__container__headings">About</div>
                            <div className="desc">{props.description}</div>
                        </div>

                        

                        {/* Sección Dimensiones */}
                        <div className="dimensions">
                            <p>
                                <span className="info__container__headings">Gender %</span> 
                                {props.genderRate === -1 ? "Genderless" : fetchGenderRate(props.genderRate)}
                            </p>
                            <p>
                                <span className="info__container__headings">Height</span> {`${(props.height / 10).toFixed(1)} m / ${Math.floor(props.height / 10 * 3.28)}' ${Math.round(((props.height / 10 * 3.28) % 1) * 12)}"`} 
                            </p>
                            <p>
                                <span className="info__container__headings">Weight</span>{` ${(props.weight / 10).toFixed(1)} kg / ${(props.weight * 0.2205).toFixed(1)} lbs`}
                            </p>
                        </div>

                        {/* Sección Habilidades */}
                        <div className="info__container__data__header">
                            <div className="info__container__data__abilities">
                                <div className="info__container__headings">Abilities</div>
                                <div className="ability__list__bg">
                                    <ul className="ability__list">
                                        {props.abilities.map((ability) => (
                                            <li key={ability}>
                                                <div className="ability">{ability}&nbsp;</div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Sección Estadísticas */}
                        <div>
                            <div className="info__container__headings stats">Base Stats</div>
                            <div className="info__container__data__data" >
                                <div className="stats-container">
                                    {props.stats.map((stat) => (
                                        <div key={stat['stat__name']} className="stat-row">
                                            <div className="stat-name">{stat['stat__name']}</div>
                                            <div className="line-chart-container">
                                                <div 
                                                    className="line-chart" 
                                                    style={{ width: `${stat['stat__val'] * 2}px`,background: `linear-gradient(${finalColor[0]}, ${finalColor[0]})` }} // Cambia el multiplicador según sea necesario
                                                >
                                                    <span className="stat-value">{stat['stat__val']}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>



                        {/* Sección Evolución */}
                        <div>
                            <div className="info__container__headings">Evolution</div>
                            <div className="evolution__box">
                                {props.evoChain.map((value, index, elements) => (
                                    <Delayed waitBeforeShow={index * 800} key={elements[index].species_name}>
                                        <div className="evolution__sub__box">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 2, ease: "easeOut", type: 'spring', bounce: 0.65, damping: 25 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="evolution__imgarrow">
                                                    <div className="evolution__img__div" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                                                        <div className="transparency__div">
                                                            <LazyLoadImage
                                                                alt="image-pokemon"
                                                                height={80}
                                                                width={80}
                                                                src={elements[index].image_url}
                                                                visibleByDefault={false}
                                                                delayMethod={'debounce'}
                                                                effect="blur"
                                                                className="evo_img"
                                                                onClick={() => props.evolutionPokemon(props.number, elements[index].species_name, props.category, elements[index].image_url)}
                                                            />
                                                        </div>
                                                    </div>
                                                    {index + 1 < elements.length && (
                                                        <div className="evo__arrow">
                                                            <ArrowRightAltIcon style={{ fontSize: "30px" }} />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                            <div className="evo__name">{elements[index].species_name}</div>
                                        </div>
                                    </Delayed>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

InfoDialog.propTypes = {
    number: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    category: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    genera: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genderRate: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    abilities: PropTypes.array.isRequired,
    stats: PropTypes.array.isRequired,
    evoChain: PropTypes.array.isRequired,
    cancel: PropTypes.func.isRequired,
    evolutionPokemon: PropTypes.func.isRequired,
};

export default InfoDialog;
