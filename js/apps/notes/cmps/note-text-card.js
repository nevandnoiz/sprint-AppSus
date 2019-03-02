import { deleteNote, updateColor, removePin, addPin, updateNote } from '../services/notes-service.js'
import modal from '../cmps/modal-cmp.js'
export default {
    name: 'textComp',
    props: ['note'],
    template: `
    <div>
        <div class="note-card" :style="{ background: note.color, order: noteOrder, display: display}" @mouseenter="toggleBtns" @mouseleave="toggleBtns" @click="displayModal = true">
            <div>
                <h2>{{note.text.headline}}</h2>
                <i class="fas fa-map-pin" v-if="note.order" @click.stop="removePin(note)"></i>
            </div>
               <p>{{note.text.body}}</p>
                <transition name="fade">
                    <div class="btns" v-show="showBtns">
                        <i class="fas fa-trash"  @click.stop="deleteNote(note.id)"></i>
                        <i class="fas fa-map-pin" v-if="!note.order" @click.stop="addPin(note)"></i>
                        <input @click.stop = "" class="color-input" :value="color" ref="color"/>
                    </div>
                </transition>
        </div>
        <transition name="fade">
            <modal :note="note" v-if="displayModal" @closeModal="displayModal = false" @updateNote="updateNote"></modal>
        </transition>

    </div>
       `,
    data() {
        return {
            color: '#ffffff',
            showBtns: false,
            display: 'flex',
            displayModal: false
        }
    },
    computed: {
        noteOrder() {
            return this.note.order ? -1 : 0
        }
    },
    methods: {
        toggleBtns() {
            this.showBtns = !this.showBtns
        },
        deleteNote(noteid) {
            deleteNote(noteid)
            this.display = 'none';
        },
        removePin(note) {
            this.showBtns = false;
            removePin(note)
        },
        addPin(note) {
            this.showBtns = false;
            addPin(note)
        },
        updateNote(body, headline) {
            updateNote(this.note, body, headline)
        }
    },
    components: { modal },
    watch: {
        color: function (val) {
            updateColor(val, this.note)
        },
    },
    mounted() {
        const elem = this.$refs.color;
        const hueb = new Huebee(elem, {});
        hueb.on('change', (color) => this.color = color)
    },
    created() {
        this.color = this.note.color
    }
}
