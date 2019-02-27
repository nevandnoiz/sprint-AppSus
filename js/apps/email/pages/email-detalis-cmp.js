import emailService from '../services/email-service.js';

export default {
    props: [''],
    template: `
   <div v-if="email" class="email-details">
       <span class="details-sent-by">{{email.sentBy}}</span>
        <span class="details-subject">{{email.subject}} -</span>
        <span class="details-body">{{email.body}}</span>
        <span class="details-sent-at">{{email.sentAt}}</span>
    </div>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
    },
    created() {
        const emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId)
            .then(email => this.email = email)
    },
    computed: {

    }
}