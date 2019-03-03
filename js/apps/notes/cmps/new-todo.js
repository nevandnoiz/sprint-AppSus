import { saveTodo } from '../services/notes-service.js'
import opBtns from '../cmps/options-cmp.js'


export default {
    template: `   
    <div  class="createMode new-note todos" :style="{ background: newNote.color}">
        <div class="text-note">
            <input type="text" v-model="newNote.data.headline" ref="headline"   placeholder="Title" :style="{ background: newNote.color}"> 
            <section class="todos">
                <div v-for="(todo,i) in newNote.data.todos">
                    <input type="checkbox" @click.stop='' v-model="newNote.data.todos[i].done">
                    <input cols="30" rows="5"  v-model="newNote.data.todos[i].text" @focus="noteFocused" @keyup="addLine(i)" ref="body" placeholder="Start typing a task" :style="{ background: newNote.color}"></input>
                    <hr>
                </div>
            </section>
            <op-btns @addNote="addNote" :newNote="newNote"  @pinNote="pinNote"></op-btns>
        </div>
    </div>
    </div>
`
    ,
    data() {
        return {
            newNote: {
                id: '',
                date: '',
                type: 'todo',
                data: {
                    headline: '',
                    todos: [
                        {
                            num: 1,
                            done: false,
                            text: ''
                        },
                    ]
                },
                tags: null,
                color: '#ffffff',
                reminder: null,
                order: false
            },
            numOfTodos: 1
        }
    },
    computed: {
    },
    components: {
        opBtns
    },
    methods: {
        addNote() {
            saveTodo(this.newNote)
            this.newNote = {
                id: '',
                date: '',
                type: 'todo',
                data: {
                    headline: '',
                    todos: [
                        {
                            num: 1,
                            done: false,
                            text: ''
                        },
                    ]
                },
                tags: null,
                color: '#ffffff',
                reminder: null,
                order: false
            }
            this.numOfTodos = 1
        },
        noteFocused() {
            if (!this.newNote.date) this.newNote.date = Date.now()
        },
        pinNote() {
            this.newNote.order = !this.newNote.order
        },

        addLine(i) {
            if (this.newNote.data.todos[i + 1]) return
            this.newNote.data.todos.push({
                num: this.numOfTodos++,
                done: false,
                text: ''
            })
        }
    },
}