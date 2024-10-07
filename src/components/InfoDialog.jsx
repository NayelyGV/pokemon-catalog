import React from 'react';
import { withStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import MuiDialogContent from '@mui/material/DialogContent';
import '../styles/InfoDialog.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Delayed from './Delayed';
import { colorTypeGradients } from '../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { motion } from "framer-motion";

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

// Función para obtener la tasa de género
const fetchGenderRate = (genderRate) => {
    if (genderRate < 0 || genderRate > 8) {
        return <span>Gender rate out of bounds</span>;
    }
    
    const genderRates = [
        <div><span className="gender-male">100% <i className="fa fa-mars"></i></span><span> 0% <i className="fa fa-venus"></i></span></div>,
        <div><span>87.5% <i className="fa fa-mars"></i></span><span>  12.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>75% <i className="fa fa-mars"></i></span><span>  25% <i className="fa fa-venus"></i></span></div>,
        <div><span>62.5% <i className="fa fa-mars"></i></span><span>  37.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>50% <i className="fa fa-mars"></i></span><span>  50% <i className="fa fa-venus"></i></span></div>,
        <div><span>37.5% <i className="fa fa-mars"></i></span><span>  62.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>25% <i className="fa fa-mars"></i></span><span>  75% <i className="fa fa-venus"></i></span></div>,
        <div><span>12.5% <i className="fa fa-mars"></i></span><span>  87.5% <i className="fa fa-venus"></i></span></div>,
        <div><span>0% <i className="fa fa-mars"></i></span><span>  100% <i className="fa fa-venus"></i></span></div>,
    ];

    return genderRates[genderRate] || <span>Loading...</span>;
};

export default function InfoDialog(props) {
    // Verifica si las props son válidas
    if (!props.category || props.category.length === 0) {
        return <div>No data available</div>;
    }

    let finalColor;

    // Lógica para obtener el color final
    if (props.category.length === 2) {
        finalColor = colorTypeGradients(props.category[0].type.name, props.category[1].type.name, props.category.length);
    } else {
        finalColor = colorTypeGradients(props.category[0].type.name, props.category[0].type.name, 1);
    }

    return (
        <div>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={props.open}
                onBackdropClick={props.cancel}
                fullWidth
                maxWidth="md"
                className="dialog__bg noselect"
            >
                <DialogContent style={{ background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})` }} className="dialog__content">
                    <div className="info__container">
                        <div className="info__container__img">
                            <div className="pokemon__id">
                                #{String(props.number).padStart(3, '0')}
                            </div>
                            <div className="pokemon__name">
                                {props.name}
                            </div>
                            <div className="pokemon__genera" style={{ background: finalColor[0] }}>
                                {props.genera}
                            </div>
                            <div>
                                <img src={props.img} alt="poke-img" />
                            </div>
                            <div className="info__container__data__type">
                                {props.category.map((category) =>
                                    <Tooltip TransitionComponent={Zoom} key={category.type.name} title={category.type.name} arrow>
                                        <div className={`poke__type__bg ${category.type.name}`}>
                                            <img src={`${category.type.name}.png`} alt="poke-type" />
                                        </div>
                                    </Tooltip>
                                )}
                            </div>
                            <div className="dimensions">
                                <p>
                                    <span className="info__container__headings" style={{ fontSize: "20px" }}>Height</span> {`${props.height / 10} m/${`${Math.floor(props.height / 10 * 3.28)}'${Math.round(((props.height / 10 * 3.28) % 1) * 12)}"`} ` }
                                </p>
                                <p>
                                    <span className="info__container__headings" style={{ fontSize: "20px" }}>Weight</span>{` ${(props.weight / 10).toFixed(1)} kg/${(props.weight * 0.2205).toFixed(1)} lbs`}
                                </p>
                            </div>
                            <div className="gender__container">
                                {props.genderRate === -1 ? "Genderless" : fetchGenderRate(props.genderRate)}
                            </div>
                        </div>
                        <div className="info__container__data">
                            <div className="right__box">
                                <div>
                                    <div className="info__container__headings">About</div>
                                    <div className="desc">
                                        {props.description}
                                    </div>
                                </div>
                                <div className="info__container__data__header">
                                    <div className="info__container__data__abilities">
                                        <div className="info__container__headings">Abilities</div>
                                        <div className="ability__list__bg">
                                            <ul className="ability__list">
                                                {props.abilities.map((ability) =>
                                                    <li key={ability}>
                                                        <div className="ability">{ability}&nbsp;</div>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="info__container__headings stats">Base Stats</div>
                                    <div className="info__container__data__data">
                                        {props.stats.map((stat) =>
                                            <div key={stat['stat__name']} className="info__container__stat__columns">
                                                <div className="info__container__stat__columns__name">{stat['stat__name']}</div>
                                                <div className="info__container__stat__columns__val">{stat['stat__val']}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="info__container__headings">Evolution</div>
                                    <div className="evolution__box">
                                        {props.evoChain.map((value, index, elements) =>
                                            <Delayed waitBeforeShow={(index + 0) * 800} key={elements[index].species_name}>
                                                <div className="evolution__sub__box">
                                                    <div>
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 2, ease: "easeOut", type: 'spring', bounce: 0.65, damping: 25 }}
                                                            whileHover={{ scale: 1.05 }}
                                                        >
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
                                                        </motion.div>
                                                    </div>
                                                    <div className="evo__name">
                                                        {elements[index].species_name}
                                                    </div>
                                                    <div className="evo__arrow">
                                                        {index + 1 < elements.length ? <ArrowRightAltIcon style={{ fontSize: "30px" }} /> : null}
                                                    </div>
                                                </div>
                                            </Delayed>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Define valores predeterminados para las props
InfoDialog.defaultProps = {
    open: false,
    name: "Unknown",
    img: "default-image.png",
    description: "No description available",
    category: [],
    height: 0,
    weight: 0,
    genderRate: -1,
    abilities: [],
    stats: [],
    evoChain: [],
    number: 0,
};
