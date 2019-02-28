import { getFromStorage, saveToStorage, makeId } from '../../../services/util-service.js'


const storageKey = 'notes';
const gNotes = getNotesFromStorage(storageKey);
window.notes=gNotes

function getNotesFromStorage(key) {
    const notes = getFromStorage(key);
    return notes ? notes : [];
}

export function getNotes() {
    return gNotes;
}

export function saveNote(note) {
    gNotes.unshift({
        id: makeId(),
        date: note.date,
        type: note.type,
        text: {
            headline: note.text.headline,
            body: note.text.body
        },
        tags: note.tags,
        color: note.color,
        reminder: note.reminder,
        url: note.url,
        order: note.order
    })
    saveToStorage(storageKey, gNotes);
}


export function deleteNote(noteid) {
    const noteToDelet = getNoteIdx(noteid)
    gNotes.splice(noteToDelet, 1)
    saveToStorage(storageKey, gNotes);
}

function getNoteIdx(noteid) {
    return gNotes.findIndex(note => {
        return note.id === noteid
    });
}

export function updateColor(val, note){
    note.color = val;
    saveToStorage(storageKey, gNotes);
}

export function removePin(note) {
    note.order = false;
    saveToStorage(storageKey, gNotes);
}

export function addPin(note) {
    note.order = true;
    saveToStorage(storageKey, gNotes);
}