<template>
    <Page name='index'>
        <button type="button" :class="count%2==0 ? 'flash' : ''" @click="onClick">
            <span>click</span>
        </button>
    </Page>
</template>

<style lang="scss">
@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
.flash {
  animation: flash ease-in 1s 1;
}
</style>


<script>
import { on, off } from '@putiui/utils/listener.js'
export default {
    name: 'Index',
    data() {
        return {
            count: 0
        }
    },
    methods: {
        onClick() {
            this.count++;
        }
    },
    mounted() {
        on(this.$el, 'animationstart', e => {
            console.log(`animationstart`)
        });
        on(this.$el, 'animationend', e => {
            console.log(`animationend`)
        });

        on(this.$el.getElementsByTagName('span')[0], 'animationstart', e => {
            console.log(`animationstart2`)
        });
        on(this.$el.getElementsByTagName('span')[0], 'animationend', e => {
            console.log(`animationend2`)
        });
    }
}
</script>
