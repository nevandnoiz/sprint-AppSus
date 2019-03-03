export default {
    props: ['newNote'],
    template: `   
        <div class="opt-btns" @click.stop=''>
            <button  @click="$emit('addNote')">save note</button>
            <input class="color-input" value="#ffffff" ref="color" @focus="$emit('colorFocus')"  @blur="$emit('colorblur')"/>
            <i class="fas fa-map-pin" @click="$emit('pinNote')" :style="{ color: pinColor}"></i>
        </div>
`
    ,
    data() {
        return {
        }
    },
    mounted() {
        const elem = this.$refs.color;
        const hueb = new Huebee(elem, {});
        hueb.on('change', (color) => this.newNote.color = color)
    },
    computed: {
        pinColor() {
            if (this.newNote.order) return 'red'
            return 'black'
        }
    }
}