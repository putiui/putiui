const LEAVE_TIMER = {};
export default {
    computed: {
        parentSubMenu() {
            return this.$vqClosest('PtSubMenu');
        }
    },
    methods: {
        userMouseenter(event) {
            console.log(`进入`)
            if (this.parentSubMenu) {
                var sign = this.parentSubMenu.sign;
                var timer = LEAVE_TIMER[sign];
                if (timer) {
                    clearTimeout(timer)
                }
                this.parentSubMenu.remainEnter(); // 保持进入状态
            }
        },
        userMouseleave(event) {
            console.log(`出去`)
            if (this.parentSubMenu) {
                var sign = this.parentSubMenu.sign;
                LEAVE_TIMER[sign] = setTimeout(() => {
                    console.log(`Hover=>SubMenu.stopEnter`)
                    this.parentSubMenu.stopEnter(event);
                }, 0.5 * 1000)
            }
        }
    }
}
