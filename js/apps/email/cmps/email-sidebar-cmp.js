
export default {
    props: ['emails'],
    template: `
    <div class="email-sidebar">
        <span>inbox</span>
        <span>sent</span>
        <span>deleted</span>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        countUnreadMessages() {
            var count = 0;
            this.emails.forEach(email => {
                if (!email.isRead) count++
            })
            return count;
        }
    },
    computed: {
        numOfEmails() {
            return this.emails.length
        },
        numOfUnreadEmails() {
            return this.countUnreadMessages()
        },
        unreadPercentage() {
            // return 100;
            return Math.floor((this.numOfUnreadEmails / this.numOfEmails) * 100)
        },
        unreadPercentageStyle() {
            return `width:${this.unreadPercentage}%`
        }
    },
    created() {

    }
}