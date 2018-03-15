<template>
    <PtBox :class="{
        'pt-sub-menu':true,
        ['pt-menu-'+iAlign]:true,
        'disabled':disabled,
        ['pt-menu-placement-'+iPlacement]:true,
        ['is-open']:isOpen
    }" @mouseenter.native="userMouseenter" @mouseleave.native="userMouseleave">
        <a :class="['pt-menu-core', focus ? 'is-focus' : '']" :href="href" :target="target" @click="userClickCore" @focus="focus=true" @blur="focus=false" @keydown="userKeydownCore">
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
        <ul v-if="isOpen" class="pt-menu-list">
            <slot></slot>
        </ul>
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
            enterTimer: null,
            enterValidTime: 0.3 * 1000
        }
    },
    computed: {
        parentSubMenu() {
            return this.$vqClosest(`PtSubMenu`);
        },
        iPlacement() {
            var placement = this.placement || (this.parentMenuBox && this.parentMenuBox.iPlacement);
            if (placement === 'auto') {
                if (this.parentMenuBox.iDirection === 'horizontal') {
                    if (this.parentSubMenu) {
                        return 'right';
                    }
                    return 'bottom'
                } else {
                    if (this.parentMenuBox.collapsed) {
                        return 'right'
                    } else {
                        return 'bottom'
                    }
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
                    this.privateIsOpen = val;
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
        userClickCore(event) {
            if (this.iTrigger === 'click') {
                this.userExec(event);
            }
        },
        userKeydownCore(e) {
            if (!e) return;
            if (e.keyCode == 13) {
                this.userExec(e);
            }
        },
        execEnter() {
            this.open();
            this.$emit('open');
            this.parentMenuBox && this.parentMenuBox.$emit('open', this.sign);
        },
        execLeave() {
            this.close();
            this.$emit('close');
            this.parentMenuBox && this.parentMenuBox.$emit('close', this.sign);
        },
        userExec(event) {
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }

            // open / close SubMenu
            if (this.isOpen) {
                this.execLeave();
            } else {
                this.execEnter();
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
        userMouseenter(event) {
            if (this.iTrigger === 'hover' && !this.isOpen) {
                this.userEnter(event);
            }
        },
        userMouseleave(event) {
            if (this.iTrigger === 'hover') {
                this.userLeave(event);
            }
        },
        clearEnterTimer() {
            if (this.enterTimer) {
                clearTimeout(this.enterTimer);
            }
            this.enterTimer = null;
        },
        userEnter(event) {
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }
            this.clearEnterTimer();
            this.enterTimer = setTimeout(() => {
                this.clearEnterTimer();
                this.execEnter();
            }, this.enterValidTime);
        },
        userLeave(event) {
            if (!event) return;
            if (this.disabled) {
                event.preventDefault();
                return false;
            }

            if (this.enterTimer) {
                this.clearEnterTimer();
                // 进入随即马上离开，则不open
                if (!this.isOpen) return;

                // 如果已经open了则close
                this.execLeave();
            } else {
                // 进入退出时间过短，等待待dom更新完毕后判断isOpen，然后择情close
                this.$nextTick(() => {
                    if (this.isOpen) {
                        this.execLeave();
                    }
                })
            }
        }
    }
}
</script>
