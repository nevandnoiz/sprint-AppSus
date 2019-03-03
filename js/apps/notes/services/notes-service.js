import { getFromStorage, saveToStorage, makeId } from '../../../services/util-service.js'


const storageKey = 'notes';
const gNotes = getNotesFromStorage(storageKey);
window.notes = gNotes

function getNotesFromStorage(key) {
    const notes = getFromStorage(key);
    return notes ? notes : [];
}

export function getNotes(val) {
    if (!val) return gNotes
    return gNotes.filter(note => {
        val = val.toLowerCase()
        if (note.type !== 'todo') {
            return note.text.body.toLowerCase().includes(val) || note.text.headline.toLowerCase().includes(val);
        } else {
            if (note.data.headline.toLowerCase().includes(val)) return true;
            for (let i = 0; i < note.data.todos.length; i++) {
                const todo = note.data.todos[i].text.toLowerCase();
                return todo.includes(val);
            }
        }
    })
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

export function saveTodo(note) {
    gNotes.unshift({
        id: makeId(),
        date: note.date,
        type: note.type,
        data: {
            headline: note.data.headline,
            todos: []
        },
        tags: note.tags,
        color: note.color,
        reminder: note.reminder,
        order: note.order
    })
    for (let i = 0; i < note.data.todos.length; i++) {
        gNotes[0].data.todos.push({
            num: note.data.todos[i].num,
            done: note.data.todos[i].done,
            text: note.data.todos[i].text,
        })
    }
    saveToStorage(storageKey, gNotes)
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

export function updateColor(val, note) {
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

export function updateNote(note, body, headline) {
    note.text.body = body;
    note.text.headline = headline
    saveToStorage(storageKey, gNotes);
}

export function updateTodoItem(note, i) {
    note.data.todos[i].done = !note.data.todos[i].done;
    saveToStorage(storageKey, gNotes);
}