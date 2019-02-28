export default {
    props: ['email'],
    template: `
   <div class="email-preview" :class="{read: email.isRead}" @mouseenter="toggleIsHovered" @mouseleave="toggleIsHovered" >
   <i :class="emailIcon"></i>
       <span class="preview-sent-by">{{email.sentBy}}</span>
        <span class="preview-subject">{{email.subject}} -</span>
        <span class="preview-body">{{email.body}}</span>
        <span v-if="!isHovered" class="preview-sent-at">{{sentAtFormatted}}</span>
        <span v-if="isHovered" class="preview-remove-email"><i class="fas fa-trash"></i></span>
    </div>
    `,
    data() {
        return {
            isHovered: false
        }
    },
    methods: {
        timestampInTime() {
            var date = new Date(this.email.sentAt)
            var hours = date.getHours()
            var mins = date.getMinutes()
            mins = (mins < 10 ? "0" : "") + mins;
            return `${hours}:${mins}`
        },
        timestampInMonths() {
            var date = new Date(this.email.sentAt)
            var day = date.getDate()
            var month = date.getMonth()
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            for (var i = 0; i <= months.length; i++) {
                if (month === i) {
                    month = months[i]
                    break;
                }
            }
            return `${month} ${day}`
        },
        timestampInYears() {
            var date = new Date(this.email.sentAt)
            var year = date.getFullYear()
            var day = date.getDate()
            var month = date.getMonth() + 1
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            return `${day}/${month}/${year}`
        },
        toggleIsHovered() {
            this.isHovered = !this.isHovered
            // console.log('noo')
        }
    },

    created() {

    },
    computed: {
        sentAtFormatted() {
            var currTimestamp = Date.now()
            if (currTimestamp - this.email.sentAt < 24 * 60 * 60 * 1000) return this.timestampInTime()
            else {
                var currDate = new Date(currTimestamp)
                var emailDate = new Date(this.email.sentAt)
                if (currDate.getFullYear() === emailDate.getFullYear()) return this.timestampInMonths()
                else return this.timestampInYears()
            }
        },
        emailIcon() {
            if (this.email.isRead) return 'far fa-envelope-open'
            else return 'far fa-envelope'
        },
    }
}