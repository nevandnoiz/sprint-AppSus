import emailService from '../services/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailList from '../cmps/email-list-cmp.js';

export default {
    components: {
        emailFilter,
        emailList
    },
    template: `   
    <div v-if="emails">
        <email-filter></email-filter>
        <email-list :emails="emailsToShow""></email-list>
    </div>
`,
    data() {
        return {
            emails: null
        }
    },
    methods: {
    },
    computed: {
        emailsToShow() {
            return this.emails;
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails)
    }
}