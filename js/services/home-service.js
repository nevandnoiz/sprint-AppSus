import { getFromStorage, saveToStorage} from './util-service.js'

export default {
    getBackground,
    setBackground
}

var gCurrBackground = loadBackground();

function loadBackground() {
        if (getFromStorage('home-bcg')) return getFromStorage('home-bcg');
        else {
            var background = 1;
            saveToStorage('home-bcg', background)
            return background;
        }
    }

function getBackground() {
    return Promise.resolve(gCurrBackground);
}

function setBackground(background) {
    gCurrBackground = background;
    saveToStorage('home-bcg', gCurrBackground)
}