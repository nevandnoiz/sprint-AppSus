export default {
    getFromStorage,
    saveToStorage,
    genRandomInt
}

export function getFromStorage(key) {
    var val = localStorage.getItem(key);
    return JSON.parse(val)
}

export function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

export function genRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}