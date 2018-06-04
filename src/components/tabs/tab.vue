<script>
import { uniqueID, isInValidModelValue } from '../../utils/index.js';
import { hasProp } from '../../utils/vnode.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
export default {
    name: 'PtTab',
    ptTag: 'PtTab',
    mixins: [
        baseMixin,
        vqueryMixin
    ],
    props: {
        label: {
            type: [String, Number]
        },
        sign: {
            type: null,
            validator(val) {
                return !isInValidModelValue(val);
            }
        }
    },
    data() {
        return {
            labelSign: uniqueID(),
            inParentIndex: -1
        }
    },
    computed: {
        parentTabs() {
            return this.$vqClosest('PtTabs');
        },
        iSign() {
            return this.hasSignProp ? this.sign : this.labelSign;
        },
        hasSignProp() {
            return hasProp(this, 'sign');
        },
        isActive() {
            var isActive = this.parentTabs.value === this.iSign;
            return isActive;
        }
    },
    watch: {
        label() {
            this.refreshLabel();
        }
    },
    methods: {
        refreshLabel() {
            this.$nextTick(() => {
                this.parentTabs.refreshLabel();
            })
        }
    },
    render(h) {
        return h('div', {
            'class': {
                'pt-tab': true,
                active: this.isActive
            },
            'data-sign': this.labelSign
        }, [
                this.$slots.default
            ])
    },
    created() {
        if (!this.parentTabs) {
            throw new Error('parent component need PtTabs');
        }
        this.refreshLabel();
    },
    updated() {
        this.refreshLabel();
    },
    beforeDestroy() {
        this.refreshLabel();
    }
}
</script>
