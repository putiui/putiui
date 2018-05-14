import lazy from './lazy';
export default [
{@each list as item, index}
{
    name: '${item.componentName}',
    path: '${item.route}',
    component: lazy('${item.componentPath}'),
    meta: $${item.meta}
}{@if index!=list.length-1},{@/if}
{@/each}
]
