<template>
    <Page name="notfound">
        <h2>404</h2>
        <h5>你打开的页面不存在</h5>
        <div class="text-center">
            <pt-button type="success" @click="back">返回上一页</pt-button>
            <router-link class="pt-btn pt-btn-primary" :to="'/'">返回首页</router-link>
        </div>
    </Page>
</template>
<style lang="scss">
@import '../assets/style/mixin.scss';
.page-notfound {
    text-align: center;
    padding-top: 100px;

    h2 {
        font-size: 300px;
        font-weight: bold;
        letter-spacing: 20px;
        text-shadow: 0 1px 10px rgba(0, 0, 0, .4);
    }
    h5 {
        font-size: 20px;
    }
}
</style>

<script>
export default {
    name: 'NotFound',
    methods: {
        back() {
            this.$router.back();
        }
    }
}
</script>
