import {saveNote} from '../services/notes-service.js'
import {getCurrentTime , makeId } from '../../../services/util-service.js'

export default {
    template: `   
    <div class="new-note">

        <textarea  cols="30" rows="2" v-model="newNote.text.body" @focus="noteFocused"></textarea>
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
                    headline: '',
                    body: ''
                },
                tags: null,
                coor: 'white',
                reminder: null
            }
        }
    },
    methods: {
        addNote(){
            saveNote(this.newNote)
        },
        noteFocused(){
            this.newNote.date = getCurrentTime()
        }
    },
    computed: {

    },
    components: {
    },
    created() {

    }
}