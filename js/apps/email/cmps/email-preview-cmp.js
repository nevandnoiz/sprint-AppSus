export default {
    props: ['email'],
    template: `
   <div class="email-preview">
       <span class="preview-sent-by">{{email.sentBy}}</span>
        <span class="preview-subject">{{email.subject}} -</span>
        <span class="preview-body">{{email.body}}</span>
        <span class="preview-body">{{sentAtFormatted}}</span>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {
    },
    created() {

    },
    computed: {
        sentAtFormatted() {
            var sentAt = ''+this.email.sentAt;
            // console.log(sentAt)
            var hours = sentAt.substring(0, 2);
            var mins = sentAt.substring(2, 4)
            return `${hours}:${mins}`
        }
    }
}