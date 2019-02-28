import { saveNote } from '../services/notes-service.js'

export default {
    template: `   
    <div  :class="[{ createMode: edit }, 'new-note']">
        <div class="text-note">
            <input v-if="edit" type="text" v-model="newNote.text.headline" ref="headline"  @blur="noteBlur" placeholder="Title">
            <textarea cols="30" rows="5" v-model="newNote.text.body" @focus="noteFocused" @blur="noteBlur" ref="body" :placeholder="textareaPlaceholder"></textarea>
            <button v-if="edit" @click="addNote">save note</button>
        </div>
        <div class="upload-btns" v-if="!edit">
        <i :class="videoClass" @click="uploadVideo"></i>
        </div>
       
</iframe>

    </div>
`
    ,
    data() {
        return {
            newNote: {
                id: '',
                date: '',
                type: 'textComp',
                text: {
                    headline: null,
                    body: null
                },
                tags: null,
                color: 'white',
                reminder: null
            },
            edit: false,
            video: false,
            videoClass: 'fab fa-youtube'
        }
    },
    computed: {
        textareaPlaceholder() {
            if (this.video) return 'Enter youtube link here!'
            else return 'Take a note..'
        }
    },
    methods: {
        addNote() {
            if (!this.newNote.text.headline && !this.newNote.text.body) return
            saveNote(this.newNote)
            this.newNote = {
                id: '',
                date: '',
                type: 'textComp',
                text: {
                    headline: '',
                    body: ''
                },
                tags: null,
                color: 'white',
                reminder: null
            }
        },
        addVideo() {

        },
        noteFocused() {
            if (!this.newNote.date) this.newNote.date = Date.now();
            if (this.video) return;
            this.edit = true;
            const body = this.$refs.body;
            setTimeout(() => body.focus(), 0);
        },
        noteBlur() {
            if (this.video) return
            const body = this.$refs.body;
            const headline = this.$refs.headline
            setTimeout(() => {
                if (body === document.activeElement || headline === document.activeElement) return;
                this.edit = false;
                this.addNote()
            }, 0)
        },
        uploadVideo() {
            if (!this.video) {
                this.video = true;
                this.videoClass = 'fas fa-cloud-upload-alt'
            } else {
                if (!this.newNote.text.body) {
                    this.videoClass = 'fab fa-youtube';
                    this.video = false;
                } else {
                    this.newNote.type = 'videoCmp'
                    this.newNote.url = this.newNote.text.body
                    this.newNote.text.body = 'videoCmp'
                    this.addNote(this.newNote)
                    this.video = false;
                    this.videoClass = 'fab fa-youtube';
                }
            }
        }
    },
}