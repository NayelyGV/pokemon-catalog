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
    if (genderRate < 0 || genderRate > 8) return <span>Gender rate out of bounds</span>;

    const genderRates = [
        { male: "100%", female: "0%" },
        { male: "87.5%", female: "12.5%" },
        { male: "75%", female: "25%" },
        { male: "62.5%", female: "37.5%" },
        { male: "50%", female: "50%" },
        { male: "37.5%", female: "62.5%" },
        { male: "25%", female: "75%" },
        { male: "12.5%", female: "87.5%" },
        { male: "0%", female: "100%" },
    ];

    const { male, female } = genderRates[genderRate] || {};
    return (
        <div>
            <span className="gender-male">{male} <i className="fa fa-mars"></i></span>
            <span>{female} <i className="fa fa-venus"></i></span>
        </div>
    );
};

const InfoDialog = ({
    number,
    img,
    category,
    name,
    genera,
    description,
    genderRate,
    height,
    weight,
    abilities,
    stats,
    evoChain,
    cancel,
    evolutionPokemon,
}) => {
    if (!category || category.length === 0) return <div>No data available</div>;

    const finalColor = colorTypeGradients(
        category[0].type.name,
        category.length === 2 ? category[1].type.name : category[0].type.name,
        category.length
    );

    return (
        <div className="info-dialog-container">
            <div className="info__container">
                <div className="info__container__img" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                    <div className="info__container__img__header">
                        <div className="info__container__button" onClick={cancel}>
                            <ArrowBackIcon />
                        </div>
                        <div className="pokemon__id">#{String(number).padStart(3, '0')}</div>
                    </div>

                    <img src={img} alt="poke-img" />
                    <div className="info__container__data__type">
                        {category.map(({ type: { name } }) => (
                            <Tooltip TransitionComponent={Zoom} key={name} title={name} arrow>
                                <div className={`poke__type__bg ${name}`}>
                                    <img src={`${name}.svg`} alt={`${name}-type`} />
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>

                <div className="info__container__data">
                    <div className="right__box">
                        <div className="info__container__header__name">
                            <div className="info__container__title">
                                <div className="pokemon__name">{name}</div>
                                <div className="pokemon__genera" style={{ background: finalColor[0] }}>{genera}</div>
                            </div>
                            <div className='info_container_favorite'>F</div>
                        </div>

                        <div className="about__section">
                            <div className="info__container__headings">About</div>
                            <div className="desc">{description}</div>
                        </div>

                        <div className="dimensions">
                            <p><span className="info__container__headings">Gender %</span> {genderRate === -1 ? "Genderless" : fetchGenderRate(genderRate)}</p>
                            <p><span className="info__container__headings">Height</span> {(height / 10).toFixed(1)} m / {Math.floor(height / 10 * 3.28)}' {Math.round((height / 10 * 3.28 % 1) * 12)}"</p>
                            <p><span className="info__container__headings">Weight</span> {(weight / 10).toFixed(1)} kg / {(weight * 0.2205).toFixed(1)} lbs</p>
                        </div>

                        <div className="info__container__data__abilities">
                            <div className="info__container__headings">Abilities</div>
                            <ul className="ability__list">
                                {abilities.map((ability) => (
                                    <li key={ability}>
                                        <div className="ability">{ability}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="info__container__headings stats">Base Stats</div>
                        <div className="stats-container">
                            {stats.map(({ stat__name, stat__val }, index) => (
                                <div key={index} className="stat-row">
                                    <div className="stat-name">{stat__name}</div>
                                    <div className="line-chart-container">
                                        <div className="line-chart" style={{ width: `${stat__val * 2}px`, background: `linear-gradient(${finalColor[1]}, ${finalColor[1]})` }}>
                                            <span className="stat-value">{stat__val}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="info__container__headings">Evolution</div>
                            <div className="evolution__box">
                                {evoChain.map((evolution, index, elements) => (
                                    <Delayed waitBeforeShow={index * 800} key={evolution.species_name}>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, ease: "easeOut", type: 'spring', bounce: 0.65, damping: 25 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="evolution__sub__box" // Cambiado
                                        >
                                            <div className="evolution__imgarrow">
                                                <div className="evolution__img__div" style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }}>
                                                    <LazyLoadImage
                                                        alt={evolution.species_name}
                                                        height={80}
                                                        width={80}
                                                        src={evolution.image_url}
                                                        effect="blur"
                                                        className="evo_img"
                                                        onClick={() => evolutionPokemon(number, evolution.species_name, category, evolution.image_url)}
                                                    />
                                                </div>
                                                {index + 1 < elements.length && (
                                                    <div className="evo__arrow">
                                                        <ArrowRightAltIcon style={{ fontSize: "30px" }} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="evo__name">{evolution.species_name}</div>
                                        </motion.div>
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
