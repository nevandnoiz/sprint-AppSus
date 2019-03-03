import newNote from '../cmps/new-note.js';
import newTodo from '../cmps/new-todo.js';
import notesBoard from '../cmps/notes-board.js';
import search from '../cmps/search.js';
import { getNotes } from '../services/notes-service.js'
import { eventBus } from '../../../main.js';
import { getFromStorage } from '../../../services/util-service.js';
import navBar from '../../../cmps/nav-bar.js';


export default {
    template: `   
    <div class="notes-app-div" >
        <div class="bcg" ref="notesApp"></div>

            <nav-bar></nav-bar>
            <section class=notes-app>
                <new-note v-if="newNote" @displayTodo="newNote = false" ></new-note>
                <new-todo  v-if="!newNote" @displayNote="newNote = true"></new-todo>
                <search @search=search></search>  
                <notes-board :notes="notes"></notes-board>
            </section>
        </div>
    
`,
    data() {
        return {
            notes: '',
            searchVal: '',
            searchCat: '',
            newNote: true,
            backgroungImg: ''
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
        this.backgroungImg = getFromStorage('home-bcg')
    },
    mounted(){
        const notesApp = this.$refs.notesApp
        notesApp.style.backgroundImage = this.background

    },
    computed: {
        background(){
            return `url('../../../../img/${this.backgroungImg}.jpg')`
        }
    },
}