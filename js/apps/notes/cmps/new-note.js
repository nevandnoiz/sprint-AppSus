import { saveNote } from '../services/notes-service.js'

export default {
    template: `   
    <div class="new-note">
        <input type="text" v-model="newNote.text.headline" placeholder="headline">
        <textarea  cols="30" rows="5" v-model="newNote.text.body" @focus.once="noteFocused" placeholder="enter text here"></textarea>
        <button @click="addNote">save note</button>
    </div>
`
    ,
    data() {
        return {
            newNote: {
                id: '',
                date: '',
                type: 'text',
                text: {
                    headline: null,
                    body: null
                },
                tags: null,
                color: 'white',
                reminder: null
            }
        }
    },
    methods: {
        addNote() {
            if (!this.newNote.text.headline && !this.newNote.text.body) return
            saveNote(this.newNote)
            this.newNote = {
                id: '',
                date: '',
                type: 'text',
                text: {
                    headline: '',
                    body: ''
                },
                tags: null,
                color: 'white',
                reminder: null
            }
        },
        noteFocused() {
            this.newNote.date = Date.now()
        }
    },
}