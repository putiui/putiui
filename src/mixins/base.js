import PtText from '../components/text/text.vue';
import PtBox from '../components/box/box.vue';
export default {
    computed: {
        componentTag() {
            return this.$options._componentTag;
        }
    },
    components: {
        PtText,
        PtBox
    }
}
