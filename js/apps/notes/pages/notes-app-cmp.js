import newNote from '../cmps/new-note.js';
import newTodo from '../cmps/new-todo.js';
import notesBoard from '../cmps/notes-board.js';
import search from '../cmps/search.js';
import { getNotes } from '../services/notes-service.js'
import { eventBus } from '../../../main.js';
import navBar from '../../../cmps/nav-bar.js';

export default {
    template: `   
    <div>

        <nav-bar></nav-bar>
        <section class=notes-app>
            <new-note></new-note>
            <new-todo></new-todo>
            <search @search=search></search>  
            <notes-board :notes="notes"></notes-board>
        </section>
    </div>
`,
    data() {
        return {
            notes: '',
            searchVal: '',
            searchCat: ''
        }
    },
    methods: {
        search(val){
            this.notes = getNotes(val)
        },
        testEvent(){
            eventBus.$emit('test', this.notes)
        }
    },
    computed: {

    },
    components: {
        newNote,
        notesBoard,
        search,
        newTodo,
        navBar
    },
    watch:{
        searchVal: (val) => this.notes = getNotes(val)
    },
    created() {
        this.notes = getNotes('')
        this.testEvent()
    },
}