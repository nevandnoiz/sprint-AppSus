import emailService from '../services/email-service.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailList from '../cmps/email-list-cmp.js';

export default {
    components: {
        emailFilter,
        emailList
    },
    template: `   
    <div class="email-app" v-if="emails">
        <email-filter @filtered="setFilter"></email-filter>
        <email-list :emails="emailsToShow""></email-list>
    </div>
`,
    data() {
        return {
            emails: null,
            filterBy: null,
        }
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        }
    },
    computed: {
        emailsToShow() {
            var filteredEmails = this.emails;
            if (this.filterBy.byName !== '') {
                filteredEmails = filteredEmails.filter(email => {
                    return email.subject.toLowerCase().includes(this.filterBy.byName.toLowerCase()) ||
                        email.body.toLowerCase().includes(this.filterBy.byName.toLowerCase())
                })
            }
            if (this.filterBy.selectedFilter === 'Read') {
                filteredEmails = filteredEmails.filter(email => email.isRead)
            } else if (this.filterBy.selectedFilter === 'Unread') {
                filteredEmails = filteredEmails.filter(email => !email.isRead)
            }
            return filteredEmails;
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails)
        this.filterBy = {
            byName: '',
            selectedFilter: 'All'
        }
    }
}