export default (valueName = 'value', eventName = 'input') => {
    return {
        model: {
            prop: valueName,
            event: eventName
        },
        methods: {
            getModel() {
                return this.value
            },
            setModel(val) {
                this.$emit('input', val)
            }
        }
    }
}
