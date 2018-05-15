<template>
    <section class="code-box">
        <template v-if="lang==='vue'">
            <div class="code-run"></div>
        </template>
        <template v-else>
            <div class="code-content" v-if="$slots.default">
                <slot></slot>
            </div>
            <template v-else>
                <div class="code-content">
                    <template v-if="hasTab">
                        <ul class="code-tabs">
                            <li v-for="(value,key) in content" :key="key">{{key}}</li>
                        </ul>
                    </template>
                </div>
            </template>
        </template>
    </section>
</template>

<script>
export default {
    name: 'CodeBox',
    props: {
        content: {
            type: [String, Object]
        },
        lang: {
            // 语言，可选：vue,html,css,bash
            type: String,
            default: 'vue'
        },
        copy: {
            // 是否可以copy代码
            type: Boolean,
            default: true
        },
        collapsed: {
            // 展开代码
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currentTableKey: ''
        }
    },
    computed: {
        hasTab() {
            if (typeof this.content === 'object') {
                return true;
            }
            return false;
        }
    }
}
</script>
