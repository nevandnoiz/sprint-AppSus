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

    const time = {
        year: date.getFullYear(),
        month: date.getMonth(),
        dateDay: date.getDate(),
        hour: date.getHours(),
        min: date.getMinutes(),
        sec: date.getSeconds(),
    }
    const weekDay = date.getDay()
    const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    // time.min = (min < 10 ? "0" : "") + min;
    for (var i = 0; i <= 6; i++) {
        if (weekDay === i) {
            time.weekDay = daysOfTheWeek[i]
        }
    }
    return time;
}