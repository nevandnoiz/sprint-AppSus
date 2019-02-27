export default {
    props: ['note'],
    template: `   
        <div class="note-card">
            <h2>{{note.text.headline}}</h2>
            <p>{{note.text.body}}</p>
        </div>
`
    ,
    data() {
        return {

        }
    },
    methods: {
    },
    created(){        
    }
}