import { saveNote } from '../services/notes-service.js'
import opBtns from '../cmps/options-cmp.js'


export default {
    template: `   
    <div  :class="['createMode', 'new-note']" :style="{ background: newNote.color}">
        <div class="text-note">
            <input type="text" v-model="newNote.data.headline" ref="headline"  @blur="noteBlur" placeholder="Title" :style="{ background: newNote.color}"> 
            <section class="todos">
                <div v-for="n in numOfTodos">
                    <input type="checkbox" @click.stop=''>
                    <input cols="30" rows="5"  v-model="newNote.data.todos[n].text" @focus="noteFocused" @keyup.once="addLine" @blur="noteBlur"  ref="body" placeholder="Start typing a task" :style="{ background: newNote.color} "></input>
                </div>
            </section>
            <op-btns @addNote="addNote" :newNote="newNote" @colorFocus="btnsFocus" @colorblur="btnBlur" @pinNote="pinNote"></op-btns>
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
                type: 'textComp',
                data: {
                    headline: '',
                    todos: [
                        {
                            num: this.numOfTodos,
                            done: false,
                            text: ''
                        },
                        {
                            num: this.numOfTodos,
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
            edit: false,
            optedit: false,
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
            saveNote(this.newNote)
            this.newNote = {
                id: '',
                date: '',
                type: 'textComp',
                text: {
                    headline: '',
                    body: ''
                },
                tags: null,
                color: '#ffffff',
                reminder: null,
                order: 0
            }
        },
        noteFocused() {
            if (!this.newNote.date) this.newNote.date = Date.now();
            if (this.video) return;
            this.edit = true;
            const body = this.$refs.body;
            // setTimeout(() => body.focus(), 0);

        },
        noteBlur() {
            // setTimeout(() => {
            //     if (this.video) return
            //     if (this.optedit) return

            //     setTimeout(() => {
            //         this.edit = false;
            //         this.addNote()
            //         this.newNote.color = '#ffffff'
            //     }, 0)
            // }, 100)
        },
        pinNote() {
            this.btnsFocus()
            this.newNote.order = !this.newNote.order
            this.btnBlur()
        },
        btnsFocus(){},
        btnBlur(){},
        addLine(){
            console.log('addline');
            this.numOfTodos++
        }
    },
}