import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
    toTop: {
        zIndex: 2,
        position: 'fixed',
        bottom: (props) => (props.currentTheme === "dark" ? '2vh' : '3vh'),
        backgroundColor: (props) => (props.currentTheme === "dark" ? '#DCDCDC' : '#252a41'),
        color: (props) => (props.currentTheme === "dark" ? 'black' : '#DCDCDC'),
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: '#397BA6',
            backgroundColor: (props) => (props.currentTheme === "dark" ? '#DCDCDC' : '#252a41'),
        },
        [theme.breakpoints.up('xs')]: {
            right: '5%',
            backgroundColor: (props) => (props.currentTheme === "dark" ? 'rgb(220,220,220,0.7)' : '#252a41'),
        },
        [theme.breakpoints.up('lg')]: {
            right: '2.5%',
        },
    }
}));

const Scroll = ({ showBelow }) => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const classes = useStyles({ currentTheme });
    const [show, setShow] = useState(showBelow ? false : true);

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true);
        } else {
            if (show) setShow(false);
        }
    };

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        if (showBelow) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, [showBelow, show]);

    return (
        <div>
            {show && (
                <IconButton onClick={handleClick} className={classes.toTop} aria-label="to top" component="span">
                    <ExpandLessIcon />
                </IconButton>
            )}
        </div>
    );
};

export default Scroll; 
