export default {
    props: ['email'],
    template: `
   <div class="email-preview" :class="{read: email.isRead}">
       <span class="preview-sent-by">{{email.sentBy}}</span>
        <span class="preview-subject">{{email.subject}} -</span>
        <span class="preview-body">{{email.body}}</span>
        <span class="preview-sent-at">{{sentAtFormatted}}</span>
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
            var sentAt = '' + this.email.sentAt;
            var hours = sentAt.substring(0, 2);
            var mins = sentAt.substring(2, 4)
            return `${hours}:${mins}`
        }
    }
}