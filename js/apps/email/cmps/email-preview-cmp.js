export default {
    props: ['email'],
    template: `
   <div class="email-preview">
       <span class="preview-sent-by">{{email.sentBy}}</span>
        <span class="preview-subject">{{email.subject}}</span>
        <span class="preview-body">{{email.body}}</span>
        <span class="preview-body">{{sentAtFormatted}}</span>
    </div>
    `,
    data() {
        return {
    
        }
    },
    methods: {
 
    },
    created() {

    },
    computed: {
sentAtFormatted(){
    this.email.sentAt
}
    }
}