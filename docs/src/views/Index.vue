<template>
    <Page name='index' style="padding:40px;">
        <pt-button>Submit</pt-button>
        <pt-button type="success">你好</pt-button>
        <router-link to="/zh-CN/component-button">button</router-link>
        <router-link to="/zh-CN/guide-install">install</router-link>
        <par>
            <h5>我是par</h5>
            <sb>我是sb1</sb>
            <sb>我是sb2</sb>
        </par>
    </Page>
</template>

<script>
import P from '../components/P';
import S from '../components/S';
export default {
    name: 'Index',
    components: {
        par: P,
        sb: S
    }
}
</script>
