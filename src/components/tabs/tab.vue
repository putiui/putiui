<script>
import { uniqueID } from '../../utils/index.js';
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
            type: null
        }
    },
    data() {
        return {
            labelSign: uniqueID()
        }
    },
    computed: {
        parentTabs() {
            return this.$vqClosest('PtTabs');
        },
        hasSignProp() {
            return hasProp(this, 'sign');
        },
        isActive() {
            if (this.parentTabs.hasInputValue) {
                if (this.hasSignProp) {
                    return this.parentTabs.value === this.sign
                } else {
                    return this.parentTabs.activeLabelSign === this.labelSign
                }
            } else {
                return this.parentTabs.activeLabelSign === this.labelSign
            }
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
                this.labelSign,
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
