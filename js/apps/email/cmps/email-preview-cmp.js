import emailControls from '../cmps/email-controls-cmp.js';

export default {
    props: ['email', 'currList'],
    components:{
        emailControls
    },
    template: `
   <div class="email-preview" :class="{read: email.isRead}" @mouseenter="toggleIsHovered" @mouseleave="toggleIsHovered"> 
    <span class="preview-sent-by"><i :class="emailIcon"></i> {{email.sentBy}}</span>
        <span class="preview-subject">{{email.subject}} -</span>
        <span class="preview-body">{{email.body}}</span>
        <span v-if="!isHovered" class="preview-sent-at">{{sentAtFormatted}}</span>
        <email-controls v-if="isHovered && !isDeleted" :email="email" :currList="currList"
    @delete="$emit('delete',email.id)" @toggleRead="$emit('toggleRead',email.id)"></email-controls>
    </div>
    `,
    data() {
        return {
            isHovered: false
        }
    },
    methods: {
        timestampInHours() {
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
            if (this.currList==='deleted') return
            this.isHovered = !this.isHovered
        },
    },

    created() {

    },
    computed: {
        sentAtFormatted() {
            var currTimestamp = Date.now()
            if (currTimestamp - this.email.sentAt < 24 * 60 * 60 * 1000) return this.timestampInHours()
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
        isDeleted(){
            if (this.currList==='deleted') return true
        },
        isSent(){
            if (this.currList==='sent') return true
        }
    }
}