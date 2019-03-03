import { deleteNote, updateColor, removePin, addPin, updateNote, updateTodoItem } from '../services/notes-service.js'
// import modal from '../cmps/modal-cmp.js'
import cardBtns from '../cmps/text-card-btns-cmp.js'

export default {
    name: 'todoCmp',
    props: ['note'],
    template: `
    <div :style="{order: noteOrder, display: displayCard}">
        <div class="note-card" :style="{ background: note.color}" @mouseenter="toggleBtns" @mouseleave="toggleBtns">
            <div  @click="displayModal = true">
                <h2>{{note.data.headline}}</h2>
                <i class="fas fa-map-pin" v-if="note.order" @click.stop="removePin(note)"></i>
            </div>
            <div class="todos-section"> 
                <div v-for="(todo,i) in note.data.todos" class="todo">
                    <input type="checkbox" @click="updateCheckbox(note ,i)" v-model="todo.done">
                    <p cols="30" rows="5"  :style="{ background: color}">{{todo.text}}</p>
                </div>
            </div>
                <transition name="fade">
                <card-btns v-show="showBtns" :note="note" :color="color" @deleteNote="deleteNote(note.id)" @addPin="addPin(note)" @changeColor="changeColor">
                </card-btns>
                </transition>
        </div>
        <!-- <transition name="fade">
            <modal :note="note" v-if="displayModal" @closeModal="displayModal = false" @updateNote="updateNote" ></modal>
        </transition> -->

    </div>
       `,
    data() {
        return {
            color: '#ffffff',
            showBtns: false,
            displayCard: 'flex',
            displayModal: false,
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
            this.displayCard = 'none';
        },
        removePin(note) {
            this.showBtns = false;
            removePin(note)
        },
        addPin(note) {
            this.showBtns = false;
            addPin(note);
        },
        updateNote(body, headline) {
            updateNote(this.note, body, headline)
        },
        changeColor(color) {
            this.color = color
        },
        updateCheckbox(note, i) {
            updateTodoItem(note, i)
        }
    },
    components: {
        cardBtns
    },
    watch: {
        color: function (val) {
            updateColor(val, this.note)
        },
    },
    created() {
        this.color = this.note.color
    }
}
