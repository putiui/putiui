<template>
    <PtBox tag="li" :class="{
        'pt-menu-item-group':true
    }">
        <PtText class="pt-menu-core">
            <PtText class="pt-menu-title">{{title}}</PtText>
        </PtText>
        <PtBox tag="ul" class="pt-menu-list">
            <slot></slot>
        </PtBox>
    </PtBox>
</template>

<script>
import baseMixin from '../../mixins/base.js';
export default {
    name: 'PtMenuItemGroup',
    ptTag: 'PtMenuItemGroup',
    mixins: [baseMixin],
    props: {
        title: {
            type: String
        }
    },
    data() {
        return {
        }
    }
}
</script>
