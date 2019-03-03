

export default {
    props: ['note', 'color'],
    template: `   
        <div class="btns">
            <i class="fas fa-trash"  @click.stop="$emit('deleteNote')"></i>
            <i class="fas fa-map-pin" v-if="!note.order" @click.stop="$emit('addPin')"></i>
            <input @click.stop = "" class="color-input" :value="color" ref="color"/>
            <!-- <button @click="showReminder= true"></button> -->
            
        </div>
`
    ,
    data() {
        return {
            showReminder: false
        }
    },
    methods: {
    },
    created() {
    },
    mounted() {
        const elem = this.$refs.color;
        const hueb = new Huebee(elem, {});
        hueb.on('change', (color) => {
            this.$emit('changeColor', color)
        })
    },
}
