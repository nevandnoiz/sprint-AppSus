
export default {
    props: ['emails'],
    template: `
    <div class="email-status">
 {{numOfEmails}}
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        numOfEmails() {
            return this.emails.length
        },
        numOfUnreadEmails() {
            var unRead = 0;
        },
    },
    created() {

    }
}