<template>
    <Page name="${componentName}">
        <div class="art-header">
            $${header}
        </div>
        <div class="art-demo">
        {@each demo as item, index}
            <Demo>
                {@if item.header}
                <div class="demo-header-core" slot="header">
                    $${item.header}
                </div>
                {@/if}
                <DemoRun :data="demo[${index}]" link="$${item.link}"></DemoRun>
                {@if item.footer}
                <div class="demo-footer-core" slot="footer">
                    $${item.footer}
                </div>
                {@/if}
            </Demo>
        {@/each}
        </div>
        <div class="art-spec">
        $${spec}
        </div>
    </Page>
</template>

<script>
/* eslint-disable */
{@if demo && demo.length>0}
import Demo from '../../../components/Demo';
import DemoRun from '../../../components/DemoRun';
{@/if}
{@each demo as item}
import ${item.componentName} from '${item.importPath}';
{@/each}
export default {
    name: '${componentName}',
    data() {
        return {
            name: '${componentName}',
            meta: $${metaPaste}{@if demo && demo.length>0},
            demo: $${demoPaste}{@/if}
        }
    },
    components:{
        {@if demo && demo.length>0}
        Demo,
        DemoRun,
        {@/if}
        {@each demo as item, index}
        ${item.componentName}: ${item.componentName}{@if index!=demo.length-1},{@/if}
        {@/each}
    }
}
</script>
