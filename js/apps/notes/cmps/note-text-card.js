import { deleteNote, updateColor, removePin, addPin, updateNote } from '../services/notes-service.js'
import modal from '../cmps/modal-cmp.js'
import cardBtns from '../cmps/text-card-btns-cmp.js'
import { eventBus } from '../../../main.js';

export default {
    name: 'textComp',
    props: ['note'],
    template: `
    <div :style="{order: noteOrder, display: displayCard}">
        <div class="note-card" :style="{ background: note.color}" @mouseenter="toggleBtns" @mouseleave="toggleBtns">
            <div  @click="displayModal = true">
                <h2>{{note.text.headline}}</h2>
                <i class="fas fa-map-pin" v-if="note.order" @click.stop="removePin(note)"></i>
            </div>
               <p @click="displayModal = true">{{note.text.body}}</p>
                <transition name="fade">
                <card-btns v-show="showBtns" :note="note" :color="color" @sendToMail="sendToMail(note)" @deleteNote="deleteNote(note.id)" @addPin="addPin(note)" @changeColor="changeColor">
                </card-btns>
                </transition>
        </div>
        <transition name="fade">
            <modal :note="note" v-if="displayModal" @closeModal="displayModal = false" @updateNote="updateNote" ></modal>
        </transition>

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
        sendToMail(note) {
            setTimeout(() => {
                this.$router.push(`/email`)
            }, 1000)
            setTimeout(() => {
                eventBus.$emit('noteToMessage', note)
            }, 1600)
        }

    },
    components: {
        modal,
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
