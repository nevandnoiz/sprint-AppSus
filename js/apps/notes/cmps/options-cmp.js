export default {
    props: ['edit', 'newNote'],
    template: `   
        <div class="opt-btns" v-show="edit">
            <button  @click="$emit('addNote')">save note</button>
            <input class="color-input" value="#fff" ref="color" @focus="$emit('colorFocus')"  @blur="colorChange"/>
        </div>
`
    ,
    data() {
        return {
        }
    },
    methods: {

    },
    methods: {
        colorChange() {
            this.$emit('colorblur')
            const colorInput = this.$refs.color;
            this.newNote.color = colorInput.value
        }
    },
    mounted() {
        const elem = this.$refs.color;
        const hueb = new Huebee(elem, {
        });
    }
}