import noteCard from '../cmps/note-card.js';

export default {
    props: ['notes'],
    template: `   
        <div class="notes-board">
            <note-card v-for="note in notes" :note="note" :key="note.id"></note-card>
        </div>
`
    ,
    data() {
        return {

        }
    },
    methods: {
    },
    components: {
        noteCard
    },
    created(){
    }
}