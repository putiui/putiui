<template>
    <Page name="${name}">
        $${header}
        {@each demo as item}
            <Demo>
                {@if item.header}
                <div class="demo-header-core" slot="header">
                    $${item.header}
                </div>
                {@/if}
                <${item.componentName}></${item.componentName}>
                {@if item.footer}
                <div class="demo-footer-core" slot="footer">
                    $${item.footer}
                </div>
                {@/if}
            </Demo>
        {@/each}
        $${spec}
    </Page>
</template>

<script>
import Demo from '../../components/demo';
{@each demo as item}
import ${item.componentName} from '${item.importPath}';
{@/each}
export default {
    name: '${name}',
    data() {
        return {
            name: '${name}',
            meta: ${metaPaste}
        }
    },
    components:{
        {@each demo as item, index}
        ${item.componentName}{@if index!=demo.length-1},{@/if}
        {@/each}
    }
}
</script>
