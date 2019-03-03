export default {
    name: 'modal',
    props: ['note'],
    template: `
         <div id="myModal" class="modal">
            <div class="modal-content" :style="{ background: note.color}">
                <span class="close" @click="$emit('closeModal')">&times;</span>
                <input type="text"  v-model:value="headline" placeholder="title" :style="{ background: note.color}">
                <textarea v-model:value="body" placeholder="body" :style="{ background: note.color}" ref="body"></textarea>
            </div>
        </div>

        `,
    data() {
        return {
            body: '',
            headline: '',
            color
        }
    },
    created(){
        this.body = this.note.text.body
        this.headline = this.note.text.headline
    },
    mounted(){
        this.$refs.body.focus()  
    },
    beforeDestroy(){
        this.$emit('updateNote', this.body,this.headline)
    }

}