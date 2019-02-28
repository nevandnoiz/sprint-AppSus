
const textComp = {
    name: 'textComp',
    props: ['note'],
    template: `
     <div class="note-card" :style="{ background: note.color, order: noteOrder}">
            <div>
                <h2>{{note.text.headline}}</h2>
                <i class="fas fa-map-pin" v-if="note.order"></i>
            </div>
            <p>{{note.text.body}}</p>
        </div>
    `,
    computed: {
        noteOrder(){
            return this.note.order ? -1 : 0
        }
    }
}
const videoCmp = {
    name: 'videoCmp',
    props: ['note'],
    template: `
     <div class="video-card">
        <iframe width="230px" height="" :src="videoID"></iframe>
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
    }, 
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
