
export default {
    name: 'videoCmp',
    props: ['note'],
    template: `
         <div class="video-card">
            <iframe width="230px" height="" :src="videoID"></iframe>
        </div>
        `,
    computed: {
        videoID: function () {
            let youtubeUrl = 'https://www.youtube.com/embed/'
            const urlLength = this.note.url.length
            const idBeginning = urlLength - 11
            const videoid = this.note.url.substring(idBeginning, urlLength)
            youtubeUrl += videoid
            return youtubeUrl
        }
    },
}