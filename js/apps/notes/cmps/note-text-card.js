import { deleteNote, updateColor,removePin, addPin } from '../services/notes-service.js'
export default {
    name: 'textComp',
    props: ['note'],
    template: `
     <div class="note-card" :style="{ background: note.color, order: noteOrder}">
            <div>
                <h2>{{note.text.headline}}</h2>
                <i class="fas fa-map-pin" v-if="note.order" @click="removePin(note)"></i>
            </div>
            <p>{{note.text.body}}</p>
            <div class=btns>
                <i class="fas fa-trash"  @click="deleteNote(note.id)"></i>
                <i class="fas fa-map-pin" v-if="!note.order" @click="addPin(note)"></i>
                <input type="color" id="head" name="head" v-model:value="color">
            </div>
        </div>
    `,
    data() {
        return {
            color: ''
        }
    },
    computed: {
        noteOrder() {
            return this.note.order ? -1 : 0
        }
    },
    methods: {
        deleteNote(noteid) {
            deleteNote(noteid)
        },
        removePin(note) {
            removePin(note)
        },
        addPin(note){
            addPin(note)
        }
    },
    watch: {
        color: function(val) {
            updateColor(val, this.note)
        }
    },
    created() {
        this.color = this.note.color
    }
}
