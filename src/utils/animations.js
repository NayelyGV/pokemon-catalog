// src/components/animations.js

export const list = {
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.35,
            delayChildren: 0.75,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
};

export const items = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -150 },
};
