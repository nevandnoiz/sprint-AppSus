export default {
    getFromStorage,
    saveToStorage,
    genRandomInt,
    makeId,
    getCurrentTime
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

export function makeId() {
    var length = 6;
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return txt;
}

 export function getCurrentTime() {
    const date = new Date();
    var hour = date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;
    return `${hour}:${min}:${sec} ${ampm}`;
}