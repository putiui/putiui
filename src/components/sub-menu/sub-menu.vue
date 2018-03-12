<template>
    <PtBox :class="{
        'pt-sub-menu':true,
        ['pt-menu-'+iAlign]:true,
        'disabled':disabled,
        ['pt-menu-placement-'+iPlacement]:true,
        ['is-open']:isOpen
    }">
        <a :class="['pt-menu-core', focus ? 'is-focus' : '']" :href="href" :target="target" @click="userClickCore" @mouseover="userMouseoverCore" @mouseout="userMouseoutCore" @focus="focus=true" @blur="focus=false" @keydown="userKeydownCore">
            <PtText v-if="$slots.icon" class="pt-menu-icon">
                <slot name="icon"></slot>
            </PtText>
            <PtText class="pt-menu-title">
                <template v-if="$slots.title">
                    <slot name="title"></slot>
                </template>
                <template v-else>{{title}}</template>
            </PtText>
            <PtText tag="i" class="pt-menu-arrow"></PtText>
        </a>
        <transition name="menu-animate" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <ul v-if="isOpen" class="pt-menu-list">
                <slot></slot>
            </ul>
        </transition>
    </PtBox>
</template>

<script>
import baseMixin from '../../mixins/base.js';
import vqueryMixin from '../../mixins/vquery.js';
import menuLinkMixin from '../../mixins/menu-link.js';
export default {
    name: 'PtSubMenu',
    ptTag: 'PtSubMenu',
    mixins: [baseMixin, vqueryMixin, menuLinkMixin('PtMenu')],
    props: {
        placement: String,
        trigger: {
            type: String
        }
    },
    data() {
        return {
            privateIsOpen: false,
            leaveTimer: null
        }
    },
    computed: {
        iPlacement() {
            var placement = this.placement || (this.parentMenuBox && this.parentMenuBox.iPlacement);
            if (placement === 'auto') {
                if (this.parentMenuBox.iDirection === 'horizontal') {
                    return 'bottom'
                } else {
                    return 'right'
                }
            } else {
                return placement;
            }
        },
        isOpen: {
            get() {
                if (this.parentMenuBox && this.parentMenuBox.openedSubMenus) {
                    return this.parentMenuBox.openedSubMenus.indexOf(this.sign) != -1;
                } else {
                    return this.privateIsOpen;
                }
            },
            set(val) {
                if (this.parentMenuBox && this.parentMenuBox.openedSubMenus) {
                    if (val) {
                        this.parentMenuBox.openedSubMenus.push(this.sign);
                    } else {
                        var i = this.parentMenuBox.openedSubMenus.indexOf(this.sign);
                        if (i >= 0) {
                            this.parentMenuBox.openedSubMenus.splice(i, 1);
                        }
                    }
                } else {
                    privateIsOpen = val;
                }
            }
        },
        iTrigger() {
            if (this.trigger) {
                return this.trigger;
            }
            if (this.parentMenuBox) {
                return this.parentMenuBox.iTrigger;
            }
            return 'hover';
        }
    },
    methods: {
        open() {
            this.isOpen = true;
        },
        close() {
            this.isOpen = false;
        },
        userExec(event) {
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }

            // open / close SubMenu
            if (this.isOpen) {
                this.close();
                this.$emit('close');
                this.parentMenuBox && this.parentMenuBox.$emit('close', this.sign);
            } else {
                this.open();
                this.$emit('open');
                this.parentMenuBox && this.parentMenuBox.$emit('open', this.sign);
            }

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
        },
        userEnter(event) {
            console.log(event)
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }
            this.open();
            this.$emit('open');
            this.parentMenuBox && this.parentMenuBox.$emit('open', this.sign);
        },
        userLeave(event) {
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }
            this.leaveTimer = setTimeout(() => {
                this.close();
                this.$emit('close');
                this.parentMenuBox && this.parentMenuBox.$emit('close', this.sign);
            })
        }
    }
}
</script>
