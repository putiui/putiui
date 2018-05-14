<template>

    <ComArticle :meta="meta" :demo="demo ? demo : undefined">
        <template slot="header">
            $${header}
        </template>
        <template slot="demo">
            {@each demo as item, index}
                <Demo :data="demo[${index}]">
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
        </template>
        <template slot="spec">
            $${spec}
        </template>
    </ComArticle>

</template>

<script>
/* eslint-disable */
import ComArticle from '../../../components/ComArticle';
{@if demo && demo.length>0}
import Demo from '../../../components/Demo';
{@/if}
{@each demo as item}
import ${item.componentName} from '${item.importPath}';
{@/each}
export default {
    name: '${componentName}',
    data() {
        return {
            name: '${componentName}',
            meta: $${metaPaste},
            demo:{@if demo && demo.length>0} $${demoPaste}{@else}null{@/if}
        }
    },
    components:{
        ComArticle,
        {@if demo && demo.length>0}
        Demo,
        {@/if}
        {@each demo as item, index}
        ${item.componentName}: ${item.componentName}{@if index!=demo.length-1},{@/if}
        {@/each}
    }
}
</script>
