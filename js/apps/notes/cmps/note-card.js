
import textComp from '../cmps/note-text-card.js'
import videoCmp from '../cmps/note-video-card.js'


export default {
    props: ['note'],
    template: `   
        <component :is="note.type" :note="note"></component>
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
    components: { textComp, videoCmp }
}
