export default {
    getFromStorage,
    saveToStorage,
    genRandomInt,
    makeId
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

function getCurrentTime() {
    this.date = new Date();
    var hour = this.date.getHours() > 12 ? this.date.getHours() - 12 : this.date.getHours();
    var min = this.date.getMinutes();
    var sec = this.date.getSeconds();
    var ampm = this.date.getHours() >= 12 ? 'PM' : 'AM';
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;
    this.time = `${hour}:${min}:${sec} ${ampm}`;
}