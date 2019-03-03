
import textComp from '../cmps/note-text-card.js'
import videoCmp from '../cmps/note-video-card.js'


export default {
    props: ['note'],
    template: `   
    <div>
        <transition name="component-fade" mode="out-in">
            <component :is="note.type" :note="note"></component>
        </transition>
    </div>
`
    ,
    data() {
        return {

        }
    },
    methods: {
    },
    created() {
    },
    components: { textComp, videoCmp },
    
}
