import newNote from '../cmps/new-note.js';
import notesBoard from '../cmps/notes-board.js';
import { getNotes } from '../services/notes-service.js'


export default {
    template: `   
    <section class=notes-app>
        <new-note @updateNotes="updateNotes"></new-note>
        <notes-board :notes="notes"></notes-board>
    </section>
`,
    data() {
        return {
            notes: ''
        }
    },
    methods: {
        updateNotes(){
            console.log('momo');
            
        }
    },
    computed: {

    },
    components: {
        newNote,
        notesBoard
    },
    watch:{
    },
    created() {
        this.notes = getNotes()
    },
}