<template>
    <PtBox :class="{
        'pt-menu-item-group':true
    }">
        <PtText class="pt-menu-core">
            <PtText class="pt-menu-title">
                <template v-if="$slots.title">
                    <slot name="title"></slot>
                </template>
                <template v-else>{{title}}</template>
            </PtText>
        </PtText>
        <PtBox tag="ul" class="pt-menu-list">
            <slot></slot>
        </PtBox>
    </PtBox>
</template>

<script>
import vqueryMixin from '../../mixins/vquery.js';
import baseMixin from '../../mixins/base.js';
export default {
    name: 'PtMenuItemGroup',
    ptTag: 'PtMenuItemGroup',
    mixins: [baseMixin, vqueryMixin],
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
