import { eventBus } from '../../../main.js';

export default {
    props: ['emails'],
    template: `
    <div class="email-compose">
        <div class="compose-nav">
            <button class="close-compose" @click="$emit('closeCompose')"><i class="fas fa-times"></i></button>
        </div>
        <div class="mobile-compose-nav">
            <button title="Return" @click="$emit('closeCompose')">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button title="Return" @click="sendEmail">
                <i class="fas">Send</i>
            </button>
        </div>
        <form action="">
            <input v-model="emailData.sentBy" type="text" placeholder="To" required>
            <input v-model="emailData.subject" type="text" placeholder="Subject">
            <!-- <textarea class="reply-body" v-if="isEditReplyBody" v-model="replyBody" name="" id="" cols="30" rows="6">
                </textarea>
                <span v-if="isEditReplyBody"> </span> -->
            <span v-if="replyBody">{{replyBody}}</span>
            <textarea class="compose-body" v-model="emailData.body" name="" id="" cols="30" rows="16"></textarea>
            <button class="send-email" @click="sendEmail">Send</button>
        </form>
    </div>
    `,
    data() {
        return {
            emailData: {
                sentBy: '',
                subject: '',
                body: '',
                isRead: true,
                sentAt: null,
                id: null
            },
            replyBody: null,
            // isEditReplyBody: false
        }
    },
    methods: {
        sendEmail() {
            if (!this.emailData.sentBy) return
            this.$emit('sent', this.emailData)
            this.replyBody = null
            // this.isEditReplyBody = false
        },
        replyEmail(email) {
            this.emailData.sentBy = email.sentBy
            this.emailData.subject = 'Re: ' + email.subject
            this.replyBody = email.body;
        },
        // editReplyBody() {
        //     this.isEditReplyBody = true
        // }
    },
    computed: {
        currDate() {
            return Date.now()
        }
    },
    created() {
        eventBus.$on('composeReply', this.replyEmail)
    }
}