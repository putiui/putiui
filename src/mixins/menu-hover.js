const LEAVE_TIMER = {};
export default {
    computed: {
        parentSubMenu() {
            return this.$vqClosest('PtSubMenu');
        }
    },
    methods: {
        userMouseenter(event) {
            if (this.parentSubMenu && this.parentSubMenu.iTrigger === 'hover') {
                console.log(`进入`)
                var sign = this.parentSubMenu.sign;
                var timer = LEAVE_TIMER[sign];
                if (timer) {
                    clearTimeout(timer)
                }
                this.parentSubMenu.remainEnter(); // 保持进入状态
            }
        },
        userMouseleave(event) {
            if (this.parentSubMenu && this.parentSubMenu.iTrigger === 'hover') {
                console.log(`出去`)
                var sign = this.parentSubMenu.sign;
                LEAVE_TIMER[sign] = setTimeout(() => {
                    console.log(`Hover=>SubMenu.stopEnter`)
                    this.parentSubMenu.stopEnter(event);
                }, 0.5 * 1000)
            }
        }
    }
}
