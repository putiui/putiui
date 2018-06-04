export default {
    props: {
        api: {
            type: Function
        }
    },
    data() {
        return {
            $apiList: []
        }
    },
    methods: {
        $exportApi() {
            var list = this.$data.$apiList;
            var api = {};
            const exec = (list) => {
                for (let prop in this) {
                    const method = this[prop]
                    if (list.indexOf(prop) !== -1 && typeof method === 'function') {
                        api[prop] = method;
                    }
                }
            }
            if (Array.isArray(list)) {
                exec(list)
            } else if (typeof list === 'object') {
                exec(Object.key(list).filter(key => key !== '$exclude' && list[key]));
            }
            Object.keys(api).forEach(key => {
                api[key] = api[key].bind(this)
            })
            return api;
        }
    },
    created() {
        if (this.api) {
            this.api(this.$exportApi())
        }
    }
}
