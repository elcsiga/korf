import { cubicOut } from "svelte/easing";

let actualDepth = 0;
let previousDepth = 0;

export function setStructureDepth(d: number) {
    previousDepth = actualDepth;
    actualDepth = d;
}

export function replaceSlide({ duration = 400, pixels = 1000} = {}) {
    function send(node) {
        return function() {
            const transitionDirection = Math.sign(actualDepth-previousDepth);
            let width = document.getElementById('transition-container').offsetWidth;
            return {
                duration,
                easing: cubicOut,
                css(t, u) {
                    //return `position:absolute;width:${width}px;top:0;left:0;opacity:${t};transform:scale(${Math.floor(10*u)})`;
                    return `position:absolute;width:${width}px;top:0;left:0;opacity:${t};transform:translateX(${Math.floor(transitionDirection*pixels*u)}px)`;
                }
            }
        }
    }

    function receive(node) {
        return function() {
            const transitionDirection = Math.sign(previousDepth-actualDepth);
            return {
                duration,
                easing: cubicOut,
                css(t, u) {
                    //return `transform:scale(${Math.floor(10*u)});opacity:${t}`;
                    return `transform:translateX(${Math.floor(transitionDirection*pixels*u)}px);opacity:${t}`;
                }
            }
        }
    }

    return [send, receive];
}