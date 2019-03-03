
export default {
    props: ['unreadEmails', 'totalEmails'],
    template: `
    <div class="email-status">
    <span :style="unreadPercentageStyle">{{unreadPercentage}}%</span>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        unreadPercentage() {
            if (!this.totalEmails) return 0
            return Math.floor((this.unreadEmails / this.totalEmails) * 100)
        },
        unreadPercentageStyle() {
            return `width:${this.unreadPercentage}%`
        }
    },
    created() {

    }
}