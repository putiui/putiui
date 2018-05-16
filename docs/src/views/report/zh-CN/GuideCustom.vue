<template>        <ComArticle :meta="meta" :demo="demo ? demo : undefined">          <template slot="header">                        </template> <template slot="demo">                        </template> <template slot="spec">                        </template></ComArticle>
</template>
<script>
    /* eslint-disable */
    import ComArticle from '../../../components/ComArticle';
    export default {
        name: 'GuideCustom',
        data() {
            return {
                name: 'GuideCustom',
                meta: {
                    "category": "Guide",
                    "order": "1",
                    "title": "定制化"
                },
                demo: null
            }
        },
        components: {
            ComArticle,
        }
    }

</script>
