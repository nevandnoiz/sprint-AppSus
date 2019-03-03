export default {
    name: 'modal',
    props: ['note'],
    template: `
         <div id="myModal" class="modal" @click.nativ="$emit('closeModal')">
            <div class="modal-content" :style="{ background: note.color}"  @click.stop=''>
                <span class="close" @click="$emit('closeModal')">&times;</span>
                <input type="text"  v-model:value="headline" placeholder="title" :style="{ background: note.color}" @click.stop=''>
                <textarea v-model:value="body" placeholder="body" :style="{ background: note.color}"   @click.stop='' ref="body"></textarea>
            </div>
        </div>

        `,
    data() {
        return {
            body: '',
            headline: '',
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