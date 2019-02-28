import { getFromStorage, saveToStorage, makeId } from '../../../services/util-service.js'


const storageKey = 'notes';
const gNotes = getNotesFromStorage(storageKey);


function getNotesFromStorage(key) {
    const notes = getFromStorage(key);
    return notes ? notes : [];
}

export function getNotes(){
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
