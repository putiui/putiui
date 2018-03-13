<template>
    <PtBox tag="li" :class="{
        'pt-menu-item':true,
        'active':isActive
    }" @mouseenter.native="userMouseenter" @mouseleave.native="userMouseleave">
        <a :class="['pt-menu-core', focus ? 'is-focus' : '']" :href="href" :target="target" @click="userClickCore" @focus="focus=true" @blur="focus=false" @keydown="userKeydownCore">
            <PtText v-if="$slots.icon" class="pt-menu-icon">
                <slot name="icon"></slot>
            </PtText>
            <PtText class="pt-menu-title">
                <template v-if="$slots.default">
                    <slot></slot>
                </template>
                <template v-else>{{title}}</template>
            </PtText>
        </a>
    </PtBox>
</template>

<script>
import { has } from '../../utils/index.js';
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import menuLinkMixin from '../../mixins/menu-link.js';
import menuHoverMixin from '../../mixins/menu-hover.js';
export default {
    name: 'PtMenuItem',
    ptTag: 'PtMenuItem',
    mixins: [baseMixin, vqueryMixin, menuLinkMixin('PtSubMenu'), menuHoverMixin],
    data() {
        return {
            privateActive: false
        }
    },
    computed: {
        parentMenu() {
            return this.$vqClosest('PtMenu');
        },
        isActive: {
            get() {
                if (this.parentMenu) {
                    return this.parentMenu.activeSign === this.sign;
                } else {
                    return this.privateActive;
                }
            },
            set(val) {
                console.log(`isActive=${val}`);
                if (val && this.parentMenu) {
                    console.log(`isActive2=${val}`);
                    this.parentMenu.activeSign = this.sign;
                }
                this.privateActive = val;
            }
        }
    },
    methods: {
        userClickCore(event) {
            this.userExec(event);
        },
        userKeydownCore(e) {
            if (!e) return;
            if (e.keyCode == 13) {
                this.userExec(e);
            }
        },
        userExec(event) {
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }

            this.isActive = true;

            // goto link
            if (this.hasRouter && this.iRouter && this.to) {
                if (this.iRouterReplace) {
                    this.$router.replace(this.to)
                } else {
                    this.$router.push(this.to)
                }
            } else if (!this.to) {
                event.preventDefault();
                return false;
            }
        }
    }
}
</script>
