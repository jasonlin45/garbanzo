import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

const progress = tweened(0, {
    duration: 400,
    easing: cubicOut
});

export function placeHolderTypewriter(node, { speed = 1, delay = 0 }) {
    // const valid = (
    //     node.childNodes.length === 1 &&
    //     node.childNodes[0].nodeType === Node.TEXT_NODE
    // );

    // if (!valid) {
    //     throw new Error(`This transition only works on elements with a single text node child`);
    // }

    const text = node.placeholder;
    const duration = text.length / (speed * 0.01);

    return {
        delay,
        duration,
        tick: t => {
            const i = Math.trunc(text.length * t);
            node.placeholder = text.slice(0, i);
        }
    };
}

export function typeWriter(node, { speed = 1, delay = 0 }) {
    // const valid = (
    //     node.childNodes.length === 1 &&
    //     node.childNodes[0].nodeType === Node.TEXT_NODE
    // );

    // if (!valid) {
    //     throw new Error(`This transition only works on elements with a single text node child`);
    // }

    const text = node.textContent;
    const duration = text.length / (speed * 0.01);

    return {
        delay,
        duration,
        tick: t => {
            const i = Math.trunc(text.length * t);
            node.textContent = text.slice(0, i);
        }
    };
}

