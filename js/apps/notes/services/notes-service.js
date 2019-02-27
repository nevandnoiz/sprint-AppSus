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
    gNotes.push({
        id: makeId(),
        date: note.date,
        type: note.type,
        text: {
            headline: note.headline,
            body: note.text.body
        },
        tags: note.tags,
        color: note.color,
        reminder: note.reminder
    })
    saveToStorage(storageKey, gNotes);
    console.log(gNotes);
    
}
