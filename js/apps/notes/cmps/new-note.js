import { saveNote } from '../services/notes-service.js'

export default {
    template: `   
    <div  :class="[{ createMode: edit }, 'new-note']">
        <input v-if="edit" type="text" v-model="newNote.text.headline" ref="headline"  @blur="noteBlur" placeholder="headline">
        <textarea cols="30" rows="5" v-model="newNote.text.body" @focus="noteFocused" @blur="noteBlur" ref="body" placeholder="enter text here"></textarea>
        <button v-if="edit" @click="addNote">save note</button>
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
            },
            edit: false,
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
            if (!this.newNote.date) this.newNote.date = Date.now();
            this.edit = true;
            const body = this.$refs.body;
            setTimeout(() => body.focus(), 0);
        },
        noteBlur() {
            const body = this.$refs.body;
            const headline = this.$refs.headline
            setTimeout(() => {
                if (body === document.activeElement || headline === document.activeElement) return;
                this.edit = false;
                this.addNote()
            }, 0)
        }
    },
}