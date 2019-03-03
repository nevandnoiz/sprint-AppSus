import newNote from '../cmps/new-note.js';
import notesBoard from '../cmps/notes-board.js';
import search from '../cmps/search.js';
import { getNotes } from '../services/notes-service.js'


export default {
    template: `   
    <section class=notes-app>
        <new-note></new-note>
        <search @test=test></search>  
        <notes-board :notes="notes"></notes-board>
    </section>
`,
    data() {
        return {
            notes: '',
            searchVal: '',
            searchCat: ''
        }
    },
    methods: {
        test(val){
            this.notes = getNotes(val)
        }
    },
    computed: {

    },
    components: {
        newNote,
        notesBoard,
        search
    },
    watch:{
        searchVal: (val) => this.notes = getNotes(val)
    },
    created() {
        this.notes = getNotes('')
    },
}