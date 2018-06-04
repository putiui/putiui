<template>
    <PtBox :class="{
        'pt-menu-item':true,
        'pt-disabled':disabled,
        'pt-active':isActive
    }">
        <a :class="['pt-menu-core', focus ? 'is-focus' : '']" :href="href" :target="target" @click="userClickCore" @focus="focus=true" @blur="focus=false" @keydown="userKeydownCore">
            <PtText v-for="n in parentLevel" class="pt-menu-space" :key="'pt-menu-space-item-'+n"></PtText>
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
export default {
    name: 'PtMenuItem',
    ptTag: 'PtMenuItem',
    mixins: [baseMixin, vqueryMixin, menuLinkMixin('PtSubMenu')],
    data() {
        return {
            privateActive: false
        }
    },
    computed: {
        rootMenu() {
            return this.$vqClosest('PtMenu');
        },
        parentLevel() {
            return this.parentMenuBox ? this.parentMenuBox.level : 0;
        },
        isActive: {
            get() {
                if (this.rootMenu) {
                    return this.rootMenu.activeSign === this.sign;
                } else {
                    return this.privateActive;
                }
            },
            set(val) {
                if (val && this.rootMenu) {
                    this.rootMenu.activeSign = this.sign;
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
            if (this.rootMenu.hasSelectListener) {
                this.rootMenu.$emit('select', this.sign);
            }

            // goto link
            if (this.hasRouter && this.iRoute && this.to) {
                if (this.iRouteReplace) {
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
