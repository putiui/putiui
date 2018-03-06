import Vue from 'vue';
import $ from 'jquery';
import Radio from '../../src/components/radio/index';
import RadioGroup from '../../src/components/radio-group/index';
import { createVM } from '../util/vue';
import uniqueID from '../util/uniqueid';
Vue.use(Radio);
Vue.use(RadioGroup);

describe(Radio.name, () => {
    it('props', done => {
        var props = {
            value: 'gender',
            checked: false,
            disabled: false,
            autofocus: false
        }
        Promise.all(Object.keys(props).map(prop => {
            return new Promise((resolve) => {
                var vm = {
                    prop: prop,
                    value: props[prop],
                    getProp() {
                        return vm.vm.El.find(':radio').prop(vm.prop)
                    }
                };
                vm.vm = createVM({
                    template: `
                    <pt-radio :${prop}="${prop}">${prop}</pt-radio>
                    `,
                    data() {
                        return {
                            [prop]: props[prop]
                        }
                    },
                    mounted() {
                        resolve(vm);
                    }
                });
            })
        })).then(vms => {
            return vms.map(item => {
                return new Promise(resolve => {
                    assert.isTrue(item.getProp() === item.vm[item.prop]);
                    if (typeof item.vm[item.prop] === 'boolean') {
                        item.vm[item.prop] = !item.vm[item.prop];
                    } else {
                        item.vm[item.prop] = uniqueID() + '';
                    }
                    item.vm.$nextTick(() => {
                        assert.isTrue(item.getProp() === item.vm[item.prop]);
                        item.vm.dst();
                        resolve();
                    });
                })
            });
        }).then(() => {
            done();
        }).catch(err => {
            done(err);
        })
    });

    it('v-model', done => {
        const vm = createVM({
            template: `
            <pt-radio v-model="value" value="address">address</pt-radio>
            `,
            data() {
                return {
                    value: false
                }
            },
            mounted() {
                assert.isTrue(this.value === this.El.find(':radio').prop('checked'));

                this.El.click();
                assert.isTrue(this.value);
                assert.isTrue(this.El.find(':radio').prop('checked'));

                this.$nextTick().then(() => {
                    this.value = false;
                }).then(() => {
                    var checked = this.El.find(':radio').prop('checked');
                    assert.isFalse(checked);
                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                })
            }
        });
    })

    it('group 下的radio v-model 和 checked都将不起作用', done => {
        const vm = createVM({
            template: `
            <pt-radio-group>
                <pt-radio :value="'a'" checked>A</pt-radio>
            </pt-radio-group>
            `,
            created() {
                assert.isTrue(false);
                done(new Error('error'));
            },
            errorCaptured() {
                assert.isTrue(true);
                done();
            }
        })
    })

    it('disabled', done => {
        const vm = createVM({
            template: `
            <pt-radio v-model="value" :disabled="disabled">disabled</pt-radio>
            `,
            data() {
                return {
                    value: false,
                    disabled: true
                }
            },
            mounted() {
                var self = this;
                assert.isTrue(this.value === this.El.find(':radio').prop('checked'));
                this.El.click();
                this.$nextTick().then(() => {
                    assert.isFalse(this.value);
                    assert.isFalse(this.El.find(':radio').prop('checked'));
                    this.value = true;
                }).then(() => {
                    assert.isTrue(this.value);
                    assert.isTrue(this.El.find(':radio').prop('checked'));
                    assert.isTrue(this.El.find(':radio').prop('disabled'));
                    this.disabled = false;
                }).then(() => {
                    assert.isFalse(this.El.find(':radio').prop('disabled'));
                    this.value = false;
                }).then(() => {
                    assert.isFalse(this.value);
                    this.El.click();
                }).then(() => {
                    assert.isTrue(this.value);
                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                });
            }
        })
    })

    it('onChange', done => {
        const vm = createVM({
            template: `
            <pt-radio v-model="value" @change="data=true"></pt-radio>
            `,
            data() {
                return {
                    value: false,
                    data: false
                }
            },
            mounted() {
                var self = this;
                assert.isTrue(this.value === this.El.find(':radio').prop('checked'));
                this.El.click();
                this.$nextTick().then(() => {
                    assert.isTrue(this.value);
                    assert.isTrue(this.El.find(':radio').prop('checked'));
                }).then(() => {
                    assert.isTrue(this.data);
                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                });
            }
        })
    })

    it('onChange only user input', done => {
        const vm = createVM({
            template: `
            <pt-radio v-model="value" name='unit' @change="data=2"></pt-radio>
            `,
            data() {
                return {
                    value: false,
                    data: 1,
                    name: 'unit'
                }
            },
            mounted() {
                var self = this;
                assert.isTrue(this.value === this.El.find(':radio').prop('checked'));
                this.El.click();
                this.$nextTick().then(() => {
                    assert.isTrue(this.value);
                    assert.isTrue(this.El.find(':radio').prop('checked'));
                    assert.isTrue(this.data === 2);
                    this.data = 1;
                    this.value = false;
                }).then(() => {
                    assert.isFalse(this.value);
                    assert.isFalse(this.El.find(':radio').prop('checked'));
                    assert.isTrue(this.data === 1);

                    this.dst();
                    done();
                }).catch(err => {
                    done(err);
                });
            }
        })
    })
});