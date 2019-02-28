// import notesAppCmp from "../pages/notes-app-cm";

const textComp = {
    name: 'textComp',
    props: ['note'],
    template: `
     <div class="note-card">
            <h2>{{note.text.headline}}</h2>
            <p>{{note.text.body}}</p>
        </div>
    `
}
const videoCmp = {
    name: 'videoCmp',
    props: ['note'],
    template: `
     <div class="note-card">
        <iframe width="200" height="100" :src="videoID"></iframe>
    </div>
    `,
    computed: {
        videoID: function() {
            let youtubeUrl = 'https://www.youtube.com/embed/'
            const urlLength = this.note.url.length
            const idBeginning = urlLength - 11
            const videoid = this.note.url.substring(idBeginning, urlLength)
            youtubeUrl += videoid
            return youtubeUrl
        }
    }
}


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
