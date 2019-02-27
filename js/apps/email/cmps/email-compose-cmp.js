import emailPreview from '../cmps/email-preview-cmp.js';

export default {
    components: {
        emailPreview
    },
    props: ['emails'],
    template: `
    <div class="email-compose">
        <form action="">
            <input v-model="emailData.sentBy" type="text" placeholder="To:" autofocus>
            <input v-model="emailData.subject" type="text" placeholder="Subject:">
            <textarea v-model="emailData.body" name="" id="" cols="30" rows="10"></textarea>
            <button @click="sendEmail">Send</button>
        </form>
    </div>
    `,
    data() {
        return {
            emailData: {
                sentBy: '',
                subject: '',
                body: '',
                isRead: false,
                sentAt: null,
                id: null
            }
        }
    },
    methods: {
        sendEmail() {
            this.$emit('sent', this.emailData)
        }
    },
    computed: {
        currDate() {
            return Date.now()
        }
    },
    created() {

    }
}