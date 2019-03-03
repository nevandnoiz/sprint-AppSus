import emailService from '../services/email-service.js';
import emailControls from '../cmps/email-controls-cmp.js';

export default {
    props: ['currList'],
    components:{
        emailControls
    },
    template: `
   <div v-if="email" class="email-details">
         <email-controls :email="email" :currList="currList" @delete="emitDelete" 
         @toggleRead="$emit('toggleRead',email.id)"></email-controls>
       <span class="details-subject">{{email.subject}}</span>
       <div class="sent-by-at">
       <span class="details-sent-by">
           <i class="fas fa-user-circle"></i>
           {{email.sentBy}}
           <span><{{emailAdress}}></span>
        </span>
        <span class="details-sent-at">{{fullDate}}</span>
       </div>
        <span class="details-body">{{email.body}}</span>
    </div>
    `,
    data() {
        return {
            email: null
        }
    },
    methods: {
        cutFullDate(fullDate) {
            return fullDate.substring(0, fullDate.indexOf('G'));
        },
        emitDelete(){
            this.$emit('delete',this.email.id)
            this.$router.push(`/email/${this.currList}`)
        }
    },
    created() {
        const emailId = this.$route.params.emailId;
        emailService.getEmailById(emailId, this.currList)
            .then(email => this.email = email)
    },
    computed: {
        emailAdress() {
            return `${this.email.sentBy.toLowerCase()}@gmail.com`
        },
        fullDate() {
            var fullDate = '' + new Date(this.email.sentAt);
            return this.cutFullDate(fullDate)
        },
    }
}